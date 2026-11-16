# 1. Base image: chhota aur secure
FROM node:20-alpine

# 2. Container ke andar kaam karne ka folder
WORKDIR /app

# 3. Pehle sirf package files copy karo (layer cache ke liye)
COPY package*.json ./

# 4. Sirf production dependencies install karo
RUN npm ci --omit=dev

# 5. Ab baaki code copy karo
COPY src ./src

# 6. Root user nahi, "node" user se chalao
USER node

# 7. App ka port
EXPOSE 5000

# 8. App start karo
CMD ["node", "src/server.js"]
