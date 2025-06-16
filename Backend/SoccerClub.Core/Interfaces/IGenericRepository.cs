using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;

namespace SoccerClub.Core.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        // Get all entities
        Task<IEnumerable<T>> GetAllAsync();

        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,
                                      Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);

        // Get entity by id
        Task<T> GetByIdAsync(int id);

        // Get single entity by condition
        Task<T> GetByConditionAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);

        // Find entities based on a predicate
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        // Count entities based on a predicate
        Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);

        // Add new entity
        Task<object> AddAsync(T entity);

        // Add a range of entities
        Task AddRangeAsync(IEnumerable<T> entities);

        // Update an existing entity
        Task<object> UpdateAsync(T entity);

        // Delete an entity by id
        Task DeleteAsync(object id);

        // Delete an entity by passing an instance
        void Delete(T entity);

        // Delete a range of entities
        void DeleteRange(IEnumerable<T> entities);

        Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);

        // Save changes to the database
        Task SaveChangesAsync();
    }
}
