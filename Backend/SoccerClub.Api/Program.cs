using Microsoft.EntityFrameworkCore;
using Serilog;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Mapping;
using SoccerClub.Application.Services;
using SoccerClub.Core.Interfaces;
using SoccerClub.Infrastructure.Persistence;
using SoccerClub.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)  // Read configuration from appsettings.json
    .Enrich.FromLogContext()
    .WriteTo.Console()  // Write logs to console
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)  // Write logs to file
    .CreateLogger();

// Use Serilog for logging
builder.Host.UseSerilog();

try
{
    // Configure CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowOrigins", policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:3000")
                         .AllowAnyMethod()
                         .AllowAnyHeader();
        });
    });

    // Add services to the container.
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
    builder.Services.AddTransient(typeof(IAppLogger<>), typeof(LoggerAdapter<>));

    // Add other services as needed
    builder.Services.AddScoped<INews, NewsService>();
    builder.Services.AddScoped<IStaff, StaffService>();
    builder.Services.AddScoped<ITryout, TryoutService>();
    builder.Services.AddScoped<ITryoutRegistration, TryoutRegistrationService>();
    builder.Services.AddScoped<ITeam, TeamService>();
    builder.Services.AddScoped<ITeamProgram, TeamProgramService>();
    builder.Services.AddScoped<IProgramRegistration, ProgramRegistrationService>();
    builder.Services.AddScoped<IPageService, PageService>();


    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Register AutoMapper
    builder.Services.AddAutoMapper(typeof(MappingProfile));

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();
    }

    app.UseCors("AllowOrigins");
    app.UseStaticFiles();
    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application startup failed");
}
finally
{
    Log.CloseAndFlush();  // Ensure all logs are flushed before the application exits
}




