// Create a TypeScript interface for error response structure
export interface ErrorResponse {
  title: string;
  message: string;
}

// Function to handle Firebase errors and map them to user-friendly messages
export const handleError = (
  error: any, 
  defaultTitle = 'Unknown Error',
  defaultMessage = 'Something went wrong, please try again.'
): ErrorResponse => {
  // Extract the code from Firebase error object or default to empty string
  const errorCode = error?.code || '';
  
  const errorMap: Record<string, ErrorResponse> = {
    // Authentication: Credentials & Access
    'auth/invalid-credential': { title: 'Login Failed', message: 'Invalid email or password. Please try again.' },
    'auth/user-not-found': { title: 'Account Not Found', message: 'No account exists with this email address.' },
    'auth/wrong-password': { title: 'Wrong Password', message: 'The password you entered is incorrect.' },
    'auth/user-disabled': { title: 'Account Disabled', message: 'This account has been disabled by an administrator.' },
    'auth/too-many-requests': { title: 'Too Many Attempts', message: 'Access to this account has been temporarily disabled due to many failed login attempts. Reset your password or try again later.' },
    
    // Authentication: Registration & Updates
    'auth/email-already-exists': { title: 'Email in Use', message: 'This email is already registered. Please sign in instead.' },
    'auth/invalid-email': { title: 'Invalid Email', message: 'The email address format is not valid.' },
    'auth/weak-password': { title: 'Weak Password', message: 'The password is too weak. Please use at least 6 characters.' },
    'auth/uid-already-exists': { title: 'ID Conflict', message: 'A user with this unique identifier already exists.' },
    
    // Authentication: Sessions & Tokens
    'auth/id-token-expired': { title: 'Session Expired', message: 'Your login session has expired. Please sign in again.' },
    'auth/id-token-revoked': { title: 'Access Revoked', message: 'Your session has been revoked. Please sign in again.' },
    'auth/session-cookie-expired': { title: 'Session Expired', message: 'Your session cookie has expired.' },
    
    // Authentication: Administrative & Config
    'auth/operation-not-allowed': { title: 'Action Restricted', message: 'This sign-in method is not enabled for this project.' },
    'auth/claims-too-large': { title: 'Data Limit Exceeded', message: 'The profile data is too large to save.' },
    'auth/insufficient-permission': { title: 'Permission Denied', message: 'You do not have permission to perform this action.' },
    'auth/project-not-found': { title: 'Configuration Error', message: 'No Firebase project was found for the current configuration.' },
    'auth/internal-error': { title: 'Server Error', message: 'The authentication server encountered an unexpected error.' },
    
    // Network & Connectivity
    'network-request-failed': { title: 'No Connection', message: 'Please check your internet connection and try again.' },
  };

  // If a specific mapping exists, return it
  if (errorMap[errorCode]) {
    return errorMap[errorCode];
  }

  // Smart fallback logic for unmapped auth errors
  let title = defaultTitle;
  if (errorCode.startsWith('auth/')) {
    title = 'Authentication Error';
  } else if (errorCode.includes('network')) {
    title = 'Connection Error';
  }

  return { 
    title, 
    message: defaultMessage 
  };
};