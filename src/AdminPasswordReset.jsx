import axios from 'axios';
import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Alert, AlertDescription } from '@/components/ui/alert';


const AdminPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser]=useState({})

  const handleResetPassword = async () => {
    const resetdata={
        newPassword,
        passid:selectedUser._id
    }
    try {
      const response = await axios('https://mern-backend-zwld.vercel.app/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        resetdata
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        className="mb-4"
      />
      <button onClick={handleResetPassword} className="w-full mb-4">
        Reset Password
      </button>
      {message && (
       {message}
      )}
      {error && (
        
          {error}
        
      )}
    </div>
  );
};

export default AdminPassword;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [resetToken, setResetToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [step, setStep] = useState(1);

//   const navigate = useNavigate();

//   const handleRequestReset = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await axios.post('https://mern-backend-zwld.vercel.app/user/forgetpassword', { email });
//       setMessage(response.data.message);
//       setResetToken(response.data.resetToken);
//       setStep(2);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await axios.post('https://mern-backend-zwld.vercel.app/user/resetpassword', { 
//         email, 
//         resetToken, 
//         newPassword 
//       });
//       setMessage(response.data.message);
//       setStep(3);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//     alert("Password Reset Done")
    
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
//       {/* <h2 className="text-2xl font-bold mb-4">Forgot Password</h2> */}
//       {step === 1 && (
//         <form onSubmit={handleRequestReset} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block mb-1">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Enter your email address"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Requesting...' : 'Request Password Reset'}
//           </button>
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <div>
//             <label htmlFor="resetToken" className="block mb-1">Reset Token:</label>
//             <input
//               type="text"
//               id="resetToken"
//               value={resetToken}
//               onChange={(e) => setResetToken(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Enter the reset token"
//             />
//           </div>
//           <div>
//             <label htmlFor="newPassword" className="block mb-1">New Password:</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Enter your new password"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Resetting...' : 'Reset Password'}
//           </button>
//         </form>
//       )}
//       {step === 3 && (
//         <p className="text-center text-green-600">Password reset successful. You can now log in with your new password.</p>
//       )}
//       {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default AdminPassword;