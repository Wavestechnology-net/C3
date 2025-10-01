using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Mapping;
using SoccerClub.Application.Services;
using SoccerClub.Application.Settings;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Infrastructure.Persistence;
using SoccerClub.Infrastructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHealthChecks();
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
            var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

			policyBuilder.WithOrigins(allowedOrigins ?? [])
                         .AllowAnyMethod()
                         .AllowAnyHeader()
                         .AllowCredentials();
        });
    });

	var jwtSettings = builder.Configuration.GetSection("JwtSettings");
	var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

	builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = jwtSettings["Issuer"],
			ValidAudience = jwtSettings["Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(key),
			ClockSkew = TimeSpan.Zero
		};
	});

    builder.Services.AddAuthorization();

    // Add services to the container.
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
    builder.Services.AddTransient(typeof(IAppLogger<>), typeof(LoggerAdapter<>));

    builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
    builder.Services.AddSingleton(sp =>
        sp.GetRequiredService<IOptions<JwtSettings>>().Value);

    // Add other services as needed
    builder.Services.AddScoped<INews, NewsService>();
    builder.Services.AddScoped<IStaff, StaffService>();
    builder.Services.AddScoped<ITryout, TryoutService>();
    builder.Services.AddScoped<ITryoutRegistration, TryoutRegistrationService>();
    builder.Services.AddScoped<ITeam, TeamService>();
    builder.Services.AddScoped<ITeamProgram, TeamProgramService>();
    builder.Services.AddScoped<IProgramRegistration, ProgramRegistrationService>();
    builder.Services.AddScoped<IPageService, PageService>();
    builder.Services.AddScoped<IMediaService, MediaService>();
    builder.Services.AddScoped<IJwtService, JwtService>();
    builder.Services.AddScoped<ISectionService, SectionService>();

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "SoccerClub API",
            Version = "v1",
            Description = "API for SoccerClub CMS with JWT Authentication"
        });

        // Define the BearerAuth scheme
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter 'Bearer' followed by a space and your JWT token"
        });

        // Require Bearer token for all operations
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
    });

    builder.Services.AddHttpContextAccessor();

    // Register AutoMapper
    builder.Services.AddAutoMapper(typeof(MappingProfile));

    var app = builder.Build();

	using var scope = app.Services.CreateScope();
	var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
	var userRepository = scope.ServiceProvider.GetRequiredService<IGenericRepository<User>>();
	var passwordHasher = new PasswordHasher<User>();

	if (!context.Users.Any())
	{
		var admin = new User
		{
			Username = "admin",
			Email = "admin@soccerclub.com",
			Role = "Admin",
			PasswordHash = passwordHasher.HashPassword(null, "Admin@123")
		};
		await userRepository.AddAsync(admin);
	}

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

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.MapHealthChecks("/health");

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




