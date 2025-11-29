# Business Portal Implementation Status

## ✅ COMPLETED

### 1. Project Structure
- Created separate Next.js app at `/var/www/business-portal`
- Installed all dependencies (Next.js 14, React, TypeScript, Tailwind, Prisma)
- Configured package.json with scripts (runs on port 3001)

### 2. Configuration Files
- ✅ next.config.js
- ✅ tsconfig.json
- ✅ tailwind.config.ts
- ✅ postcss.config.js
- ✅ app/globals.css
- ✅ app/layout.tsx (with Toaster)

### 3. Database
- ✅ BusinessSubmission model added to main app schema
- ✅ Prisma client generated for both apps
- ✅ Database migrated with new model
- ✅ lib/prisma.ts helper created

### 4. Database Schema Fields
```prisma
- id, submissionType (quick/detailed)
- businessNameEn, businessNameDv
- category, descriptionEn, descriptionDv
- contactPerson, email, phone, address, website, socialMedia
- registrationNumber, registrationDocument (file path)
- logo, additionalDocs, openingHours, services, faqs
- status (pending/approved/rejected)
- adminNotes, reviewedBy, reviewedAt
- createdAt, updatedAt
```

## 🚧 IN PROGRESS / TODO

### 5. Main Landing Page
Need to create: `/app/page.tsx`
- Hero section explaining the portal
- Two submission options (Quick Add / Detailed Profile)
- Benefits of joining
- Contact info

### 6. Quick Add Form
Need to create: `/app/quick-add/page.tsx`
Fields:
- Business Name (EN)
- Category (dropdown)
- Description
- Contact Person
- Email
- Phone
- Submit button

### 7. Detailed Profile Form
Need to create: `/app/detailed-profile/page.tsx`
Additional fields:
- Business Name (DV)
- Description (DV)
- Address
- Website
- Social Media
- Registration Number
- File uploads (logo, registration doc, additional docs)
- Opening Hours
- Services
- FAQs

### 8. File Upload API
Need to create: `/app/api/upload/route.ts`
- Handle file uploads
- Save to `/var/www/dhonkamana-ai/public/uploads/business/`
- Return file paths
- Validate file types and sizes

### 9. Submission API
Need to create: `/app/api/submit/route.ts`
- Save submission to database
- Return success/error response

### 10. Success Page
Need to create: `/app/success/page.tsx`
- Thank you message
- What happens next
- Tracking information

### 11. Admin Panel (Main App)
Need to create: `/var/www/dhonkamana-ai/app/admin/business-submissions/page.tsx`
- List all submissions (pending/approved/rejected tabs)
- View details
- Approve/Reject with notes
- Trigger email notifications

### 12. Email Notifications
Need to add to main app: `/app/api/admin/business-submissions/[id]/review/route.ts`
- Send approval email
- Send rejection email with admin notes
- Use existing email system from main app

### 13. Nginx Configuration
Need to add to `/etc/nginx/sites-available/`
```nginx
server {
    server_name business.aibey.cloud;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 14. PM2 Setup
```bash
pm2 start npm --name "business-portal" -- start
pm2 save
```

### 15. SSL Certificate
```bash
certbot --nginx -d business.aibey.cloud
```

## File Locations

### Business Portal (business.aibey.cloud)
- `/var/www/business-portal/` - Root directory
- Port: 3001

### Main App (aibey.cloud)
- `/var/www/dhonkamana-ai/` - Root directory
- Port: 3000

### Shared Database
- `/var/www/dhonkamana-ai/prisma/dev.db`

### File Uploads Storage
- `/var/www/dhonkamana-ai/public/uploads/business/`

## Next Steps

1. Continue building forms and pages
2. Create upload API
3. Build admin panel
4. Set up email notifications
5. Configure Nginx and PM2
6. Test end-to-end flow

## Commands to Run After Completion

```bash
# Build business portal
cd /var/www/business-portal
npm run build

# Start with PM2
pm2 start npm --name "business-portal" -- start

# Configure Nginx
sudo nano /etc/nginx/sites-available/business.aibey.cloud
sudo ln -s /etc/nginx/sites-available/business.aibey.cloud /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL
sudo certbot --nginx -d business.aibey.cloud
```
