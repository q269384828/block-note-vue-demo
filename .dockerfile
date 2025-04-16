# Use official nginx image
FROM nginx:alpine-slim

# Copy the dist directory to nginx html directory
COPY dist/ /usr/share/nginx/html/

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]