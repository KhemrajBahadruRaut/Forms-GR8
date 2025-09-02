// BusinessPrintUtils.jsx - Print utility functions for business information

// Helper function to create info items for print
const createInfoItem = (label, value, fullWidth = false) => {
  if (!value || value === 'undefined' || value === 'null') {
    return '';
  }
  return `
    <div class="info-item ${fullWidth ? 'full-width' : ''}">
      <div class="info-label">${label}</div>
      <div class="info-value">${value}</div>
    </div>
  `;
};

// Main print function
export const printBusinessInfo = (selectedBusiness) => {
  if (!selectedBusiness) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Business Information - ${selectedBusiness.business_name || 'Unnamed Business'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 10px;
            line-height: 1;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #4F46E5;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .business-title {
            font-size: 2em;
            font-weight: bold;
            color: #4F46E5;
            margin: 0;
            padding: 4px;
          }
          .section {
            margin-bottom: 10px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 1em;
            font-weight: bold;
            color: #374151;
            border-bottom: 2px solid #E5E7EB;
            padding-bottom: 8px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          .section-icon {
            margin-right: 8px;
            font-size: 1.2em;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 10px;
          }
          .info-item {
            background-color: #F9FAFB;
            padding: 5px;
            border-radius: 6px;
            border-left: 4px solid #4F46E5;
          }
          .info-label {
            font-weight: bold;
            color: #6B7280;
            font-size: 0.9em;
            margin-bottom: 4px;
          }
          .info-value {
            color: #111827;
            word-wrap: break-word;
          }
          .full-width {
            grid-column: 1 / -1;
          }
          @media print {
            body {
              margin: 10px;
            }
            .section {
              page-break-inside: avoid;
              margin-bottom: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="business-title">${selectedBusiness.business_name || 'Unnamed Business'}</h1>
          <p style="color: #6B7280; margin: 5px 0 0 0;">Business Information Report</p>
        </div>

        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">🏢</span>
            Business Information
          </h2>
          <div class="info-grid">
            ${createInfoItem('Business Name', selectedBusiness.business_name)}
            ${createInfoItem('Location', selectedBusiness.location)}
            ${createInfoItem('ZIP Code', selectedBusiness.zip_code)}
            ${createInfoItem('Phone Number', selectedBusiness.phone_number)}
            ${createInfoItem('Email', selectedBusiness.email)}
            ${createInfoItem('Website', selectedBusiness.website)}
            ${createInfoItem('Contact Name', selectedBusiness.contact_name)}
            ${createInfoItem('Contact Number', selectedBusiness.contact_number)}
          </div>
        </div>

        ${selectedBusiness.social_media_info ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">📱</span>
            Social Media Information
          </h2>
          <div class="info-grid">
            ${createInfoItem('Social Accounts Exist', selectedBusiness.social_media_info.social_accounts_exist)}
            ${createInfoItem('Selected Platforms', selectedBusiness.social_media_info.selected_platforms?.join(', '))}
            ${createInfoItem('Other Platform', selectedBusiness.social_media_info.other_platform)}
            ${createInfoItem('Setup/Redesign', selectedBusiness.social_media_info.setup_redesign)}
            ${createInfoItem('Setup Details', selectedBusiness.social_media_info.setup_details, true)}
          </div>
        </div>
        ` : ''}

        ${selectedBusiness.target_info ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">🎯</span>
            Target Audience Information
          </h2>
          <div class="info-grid">
            ${createInfoItem('Selected Ages', selectedBusiness.target_info.selected_ages?.join(', '))}
            ${createInfoItem('Selected Genders', selectedBusiness.target_info.selected_genders?.join(', '))}
            ${createInfoItem('Target Location', selectedBusiness.target_info.target_location)}
            ${createInfoItem('Target Interests', selectedBusiness.target_info.target_interests)}
            ${createInfoItem('Target Profession', selectedBusiness.target_info.target_profession)}
            ${createInfoItem('Other Details', selectedBusiness.target_info.target_other_details)}
            ${createInfoItem('Industries', selectedBusiness.target_info.target_industries)}
            ${createInfoItem('Pain Points', selectedBusiness.target_info.target_pain_points, true)}
          </div>
        </div>
        ` : ''}

        ${selectedBusiness.brand_voice ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">🌟</span>
            Brand Voice
          </h2>
          <div class="info-grid">
            ${createInfoItem('Selected Voices', selectedBusiness.brand_voice.selected_voices?.join(', '))}
            ${createInfoItem('Other Voice', selectedBusiness.brand_voice.other_voice)}
            ${createInfoItem('Brand Phrases', selectedBusiness.brand_voice.brand_phrases, true)}
            ${createInfoItem('Brand Exclusions', selectedBusiness.brand_voice.brand_exclusions, true)}
          </div>
        </div>
        ` : ''}

        ${selectedBusiness.content_preferences ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">📝</span>
            Content Preferences
          </h2>
          <div class="info-grid">
            ${createInfoItem('Selected Content Types', selectedBusiness.content_preferences.selected_content_types?.join(', '))}
            ${createInfoItem('Other Content Type', selectedBusiness.content_preferences.other_content_type)}
          </div>
        </div>
        ` : ''}

        ${selectedBusiness.workflow_info ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">⚙️</span>
            Workflow Information
          </h2>
          <div class="info-grid">
            ${createInfoItem('Reviewer Name', selectedBusiness.workflow_info.reviewer_name)}
            ${createInfoItem('Reviewer Location', selectedBusiness.workflow_info.reviewer_location)}
            ${createInfoItem('Reviewer Phone', selectedBusiness.workflow_info.reviewer_phone)}
            ${createInfoItem('Country Code', selectedBusiness.workflow_info.country_code)}
            ${createInfoItem('Preferred Contact Modes', selectedBusiness.workflow_info.preferred_contact_modes?.join(', '))}
            ${createInfoItem('Other Contact Method', selectedBusiness.workflow_info.other_contact_method)}
            ${createInfoItem('Report Frequency', selectedBusiness.workflow_info.report_frequency)}
          </div>
        </div>
        ` : ''}

        ${selectedBusiness.additional_info ? `
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon">📊</span>
            Additional Information
          </h2>
          <div class="info-grid">
            ${createInfoItem('Admire Accounts', selectedBusiness.additional_info.admire_accounts)}
            ${createInfoItem('Competitors', selectedBusiness.additional_info.competitors)}
            ${createInfoItem('Upcoming Launches', selectedBusiness.additional_info.upcoming_launches)}
            ${createInfoItem('Other Information', selectedBusiness.additional_info.other_info, true)}
          </div>
        </div>
        ` : ''}

        <div style="margin-top: 40px; text-align: center; color: #6B7280; font-size: 0.9em;">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

// Additional print utility functions can be added here
export const printBusinessSummary = (businessList) => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Business Directory Summary</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #4F46E5;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .summary-title {
            font-size: 2em;
            font-weight: bold;
            color: #4F46E5;
            margin: 0;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background-color: #F9FAFB;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4F46E5;
            text-align: center;
          }
          .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #4F46E5;
          }
          .stat-label {
            color: #6B7280;
            font-weight: medium;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #E5E7EB;
          }
          th {
            background-color: #F9FAFB;
            font-weight: bold;
            color: #374151;
          }
          tr:hover {
            background-color: #F9FAFB;
          }
          .status-active {
            color: #059669;
            font-weight: bold;
          }
          .status-pending {
            color: #D97706;
            font-weight: bold;
          }
          @media print {
            body { margin: 15px; }
            tr { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="summary-title">Business Directory Summary</h1>
          <p style="color: #6B7280; margin: 5px 0 0 0;">Complete Business Listings Report</p>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${businessList.length}</div>
            <div class="stat-label">Total Businesses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${businessList.filter(b => b.status === 'active').length}</div>
            <div class="stat-label">Active Businesses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${businessList.filter(b => b.status === 'pending').length}</div>
            <div class="stat-label">Pending Businesses</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${businessList.map(business => `
              <tr>
                <td>${business.business_name || 'N/A'}</td>
                <td>${business.location || 'N/A'}</td>
                <td>${business.phone_number || 'N/A'}</td>
                <td>${business.email || 'N/A'}</td>
                <td class="status-${business.status || 'pending'}">${business.status || 'Pending'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 40px; text-align: center; color: #6B7280; font-size: 0.9em;">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

export default { printBusinessInfo, printBusinessSummary };