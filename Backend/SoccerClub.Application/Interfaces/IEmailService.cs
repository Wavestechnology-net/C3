using SoccerClub.Application.DTOs.Auth;

namespace SoccerClub.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}