using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using SoccerClub.Infrastructure.Persistence;
using SoccerClub.Core.Interfaces;

namespace SoccerClub.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        // Get all entities
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(
                Expression<Func<T, bool>>? filter = null,
                Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
        {
            try
            {
                IQueryable<T> query = _dbSet;

                // Apply includes if any
                if (include != null)
                {
                    query = include(query);
                }

                // Apply the filter if provided
                if (filter != null)
                {
                    query = query.Where(filter);
                }

                // Execute the query and return the result
                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while retrieving all entities: {ex.Message}", ex);
            }
        }

        // Get single entity by condition
        public async Task<T> GetByConditionAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
        {
            try
            {
                IQueryable<T> query = _dbSet;

                // Apply includes if any
                if (include != null)
                {
                    query = include(query);
                }

                // Apply the condition (filter) with an OrderBy to ensure predictability
                return await query.OrderBy(x => EF.Property<object>(x, GetPrimaryKeyName())).FirstOrDefaultAsync(predicate);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while retrieving entity: {ex.Message}", ex);
            }
        }

        // Get entity by id
        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        // Find entities based on a predicate (for filtering)
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        // Count entities based on a predicate
        public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null)
        {
            return predicate == null ? await _dbSet.CountAsync() : await _dbSet.CountAsync(predicate);
        }

        // Add a new entity
        public async Task<object> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
                return GetPrimaryKeyValue(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while adding entity: {ex.Message}", ex);
            }
        }

        // Add a range of entities
        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }

        // Update an existing entity
        public async Task<object> UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return GetPrimaryKeyValue(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while updating entity: {ex.Message}", ex);
            }
        }

        // Delete an entity by id
        public async Task DeleteAsync(object id)
        {
            T entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // Delete an entity by passing an instance
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        // Delete a range of entities
        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
            _context.SaveChanges();
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        // Save changes to the database (for bulk operations)
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        // Private helper methods
        private string GetPrimaryKeyName()
        {
            var entityType = typeof(T);
            return entityType.Name + "Id"; // Adjust based on your primary key naming convention
        }

        private object GetPrimaryKeyValue(T entity)
        {
            var entityType = entity.GetType();
            var keyProperty = entityType.GetProperty(GetPrimaryKeyName());
            return keyProperty?.GetValue(entity);
        }
    }
}
