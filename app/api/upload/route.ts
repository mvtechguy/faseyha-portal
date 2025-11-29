import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Directory where files will be stored (in main app's public folder)
const UPLOAD_DIR = '/var/www/dhonkamana-ai/public/uploads/business';

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Generate unique filename
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  const sanitized = nameWithoutExt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `${sanitized}_${timestamp}_${randomString}${ext}`;
}

// Validate file type
function isValidFileType(filename: string): boolean {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx'];
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext);
}

// Validate file size (max 5MB)
function isValidFileSize(size: number): boolean {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return size <= maxSize;
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir();

    const formData = await request.formData();
    const uploadedFiles: { [key: string]: string } = {};

    // Process each file
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Validate file type
        if (!isValidFileType(value.name)) {
          return NextResponse.json(
            { error: `Invalid file type for ${value.name}. Allowed types: JPG, PNG, GIF, PDF, DOC, DOCX` },
            { status: 400 }
          );
        }

        // Validate file size
        if (!isValidFileSize(value.size)) {
          return NextResponse.json(
            { error: `File ${value.name} exceeds maximum size of 5MB` },
            { status: 400 }
          );
        }

        // Generate unique filename
        const fileName = generateFileName(value.name);
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Convert file to buffer and save
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Store the public URL path
        const publicPath = `/uploads/business/${fileName}`;

        // Map the form field to the public path
        if (key === 'logo') {
          uploadedFiles.logo = publicPath;
        } else if (key === 'registration') {
          uploadedFiles.registrationDocument = publicPath;
        } else if (key.startsWith('additional_')) {
          // Handle multiple additional documents
          if (!uploadedFiles.additionalDocs) {
            uploadedFiles.additionalDocs = JSON.stringify([]);
          }
          const docs = JSON.parse(uploadedFiles.additionalDocs);
          docs.push(publicPath);
          uploadedFiles.additionalDocs = JSON.stringify(docs);
        }
      }
    }

    return NextResponse.json(uploadedFiles, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files. Please try again.' },
      { status: 500 }
    );
  }
}
