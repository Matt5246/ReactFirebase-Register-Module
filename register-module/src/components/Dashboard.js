import * as React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {db} from '../config/firebase';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';

export default function App () {
    const [error, setError] = React.useState('');
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState({});
    async function handleLogout () {
        console.log('logout');
        setError('');
        try{
            await logout();
            navigate('/signin');
        } catch(e) {
            setError('Failed to log out');
        }
        
    }
  
    React.useEffect(() => {
        const getUser = async () => {
            try{
              const docRef = doc(db, "users", currentUser?.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setUserData(docSnap.data());
              } else {
                console.log("No such document!");
              }
              console.log('data:', docSnap.data());
              console.log('user data:', userData.nip);
            }catch(e){
              console.log('data problem:', e);
            }                    
        }
        getUser();
    }, [currentUser?.uid]);
  return (
    <>
      <Card className="card-style">
        <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
            <strong>Email: </strong>{currentUser?.email}<br/>
            <strong>Phone: </strong>{userData?.phone}<br/>
            <strong>NIP: </strong>{userData?.nip}<br/>
            <strong>Role: </strong>{userData?.role}<br/>
            <strong>email verified: </strong>{currentUser?.emailVerified===true ? "true" : "false"}<br/>
            

            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            <div className='w-100 text-center mt-2'>
        Need an account? <Link onClick={handleLogout} to="/signup">Sign Up</Link> {" or "} 
        <Link variant="link" onClick={handleLogout}>Log Out</Link>
      </div>
        </Card.Body>
      </Card>
      
      
     
      
    </>
  );
}
