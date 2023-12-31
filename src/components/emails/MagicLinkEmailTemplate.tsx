/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-head-element */
import * as React from 'react';

interface EmailTemplateProps {
  url: string;
  host: string;
  userEmail: string;
}

export const MagicLinkEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ url, host, userEmail }) => (
  <>
    <meta httpEquiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <body
        style={{
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          fontFamily: '"Helvetica Neue", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans"'
        }}
      >
        <center>
          <div style={{ width: '100%', height: '100%', margin: 0, backgroundColor: '#F3F4F8' }}>
            <table
              border={0}
              cellPadding="0"
              cellSpacing="0"
              style={{ minWidth: '100%', minHeight: '100%', borderCollapse: 'collapse', textAlign: 'center', tableLayout: 'fixed' }}
              role="presentation"
            >
              <tr>
                <td align="center" valign="top" style={{ paddingTop: 20 }}>
                  {/* Main content  */}
                  <table
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                    align="center"
                    style={{ width: '100%', maxWidth: 600, borderCollapse: 'collapse' }}
                    width="600"
                    role="presentation"
                  >
                    <tr>
                      <td align="left" valign="top" width="100%" style={{ padding: '40px 40px 0px 30px', backgroundColor: '#ffffff' }} dir="ltr">
                        <img
                          src="https://raw.githubusercontent.com/dominikjessen/yeschef/main/public/YesChef_Logo_ForEmail.png"
                          alt="Yes, Chef! Logo"
                          title="Yes, Chef! Logo"
                          width="157"
                          height="78"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 20, backgroundColor: '#ffffff' }} dir="ltr"></td>
                    </tr>

                    <tr>
                      <td align="left" valign="top" style={{ padding: '0px 40px 0px 40px', backgroundColor: '#ffffff' }} dir="ltr">
                        <h2 className="text-2xl m-0 font-bold">Login to {host} via magic link</h2>
                      </td>
                    </tr>

                    <tr>
                      <td align="left" valign="top" style={{ padding: '0px 40px', backgroundColor: '#ffffff' }} dir="ltr">
                        <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                          Click the button below or use the full link provided to sign in to {host}.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 20, backgroundColor: '#ffffff' }} dir="ltr"></td>
                    </tr>

                    <tr>
                      <td align="left" style={{ padding: '0px 40px 20px 40px', backgroundColor: '#ffffff' }} valign="top" dir="ltr">
                        <a
                          href={url}
                          target="_blank"
                          style={{
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: '#070503',
                            backgroundColor: '#F58238',
                            borderRadius: '6px',
                            padding: '12px 16px'
                          }}
                        >
                          <span>Log in</span>
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 20, backgroundColor: '#ffffff' }} dir="ltr"></td>
                    </tr>

                    <tr>
                      <td align="left" valign="top" style={{ padding: '0px 40px', backgroundColor: '#ffffff' }} dir="ltr">
                        <a href={url} style={{ fontSize: '12px', lineHeight: '18px', color: '#F58238' }}>
                          {url}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 20, backgroundColor: '#ffffff' }} dir="ltr"></td>
                    </tr>

                    <tr>
                      <td align="left" valign="top" style={{ padding: '0px 40px', backgroundColor: '#ffffff' }} dir="ltr">
                        <p style={{ fontSize: '16px', lineHeight: '24px' }}>If you did not request to log in, please ignore this message.</p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 40, backgroundColor: '#ffffff' }} dir="ltr"></td>
                    </tr>
                  </table>

                  {/* Footer */}
                  <table
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                    align="center"
                    style={{ width: '100%', maxWidth: 600, borderCollapse: 'collapse' }}
                    width="600"
                    role="presentation"
                  >
                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: '40px 0px' }} dir="ltr">
                        <p style={{ fontSize: '14px', lineHeight: '20px' }}>This email was sent to {userEmail}.</p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" valign="top" className="py-10" dir="ltr">
                        <a
                          href="https://yeschef.recipes/privacy-policy"
                          target="_blank"
                          style={{ fontSize: '14px', lineHeight: '20px', textDecoration: 'none' }}
                        >
                          Privacy Policy
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style={{ paddingTop: 40 }} dir="ltr"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>
  </>
);
