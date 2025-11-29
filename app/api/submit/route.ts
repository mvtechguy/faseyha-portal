import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['businessNameEn', 'category', 'descriptionEn', 'contactPerson', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create submission in database
    const submission = await prisma.businessSubmission.create({
      data: {
        submissionType: body.submissionType || 'quick',

        // Business Info
        businessNameEn: body.businessNameEn,
        businessNameDv: body.businessNameDv || null,
        category: body.category,
        descriptionEn: body.descriptionEn,
        descriptionDv: body.descriptionDv || null,

        // Contact
        contactPerson: body.contactPerson,
        email: body.email,
        phone: body.phone,
        address: body.address || null,
        website: body.website || null,
        socialMedia: body.socialMedia || null,

        // Registration
        registrationNumber: body.registrationNumber || null,
        registrationDocument: body.registrationDocument || null,

        // Additional
        logo: body.logo || null,
        additionalDocs: body.additionalDocs || null,
        openingHours: body.openingHours || null,
        services: body.services || null,
        faqs: body.faqs || null,

        // Status
        status: 'pending',
      },
    });

    // TODO: Send notification email to admin
    // This will be implemented in the main app's email system

    return NextResponse.json(
      {
        success: true,
        id: submission.id,
        message: 'Submission received successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again.' },
      { status: 500 }
    );
  }
}
