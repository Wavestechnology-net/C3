# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything and publish
COPY ./Backend .
WORKDIR /src/SoccerClub.Api
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

RUN mkdir -p /app/wwwroot/uploads
RUN mkdir -p /app/logs

RUN chmod -R 777 /app/wwwroot/uploads
RUN chmod -R 777 /app/logs

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:7000
EXPOSE 7000

ENTRYPOINT ["dotnet", "SoccerClub.Api.dll"]
