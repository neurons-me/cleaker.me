// handlers/logOutHandler.js
export const logOutHandler = (req, res) => {
    try {
      // Clear the JWT cookie (if it exists)
      res.clearCookie('cleakerToken', {
        httpOnly: true,
        secure: true,
        domain: '.cleaker.me',
        sameSite: 'Lax',
      });
  
      res.status(200).send({ message: 'Successfully logged out.' });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).send({ message: 'An error occurred during logout.' });
    }
  };
  
  export default logOutHandler;