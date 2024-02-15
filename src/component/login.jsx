import { NavLink } from "react-router-dom";
import { useState } from "react";
import { app, database} from "./firebaseConfig";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";


function Login() {
    let [currentData, setCurrentData] = useState([])
    let [myId, setMyId] = useState("");
        const collectionRef = doc(database, 'users', 'userId');
    let auth = getAuth();
    const [change, setChange] = useState(false);
    
    const [formInfo, setFormInfo] = useState({
        gender: "",
        age: "",
        email: "",
        mate: "",
        city: "",
        phoneNumber: "",
        userName: "",
        password: "",
    });

    function gatherInfo(event) {
        setFormInfo((prev)=> {
            return {
           ...prev,
           [event.target.name]: event.target.value,
            }
        })

        console.log(formInfo)
    }

    

    function addData(userId) {
        const collectionRef = doc(database, 'users', userId);
        setDoc(collectionRef,  {
           
                    gender:formInfo.gender,
                age: formInfo.age,
                email: formInfo.email,
                mate: formInfo.mate,
                city: formInfo.city,
                phoneNumber: formInfo.phoneNumber,
                userName: formInfo.userName,
 
        })
        .then((data)=> {
            alert("data added");
            console.log(data.id)
        })
        .catch((err)=> {
            alert(err.message)
        })
    }


    function getData() {
        getDocs(collectionRef)
        .then((response)=> {
            setCurrentData(response.docs.map((item)=> {
                return item.data().allUsers;
            }));
            
            
        })
    }


    function handleSubmit() {
        createUserWithEmailAndPassword(auth, formInfo.email, formInfo.password)
        .then((response)=> {
            setMyId(response.user.uid)
            console.log(myId);
            alert("successful");
            addData(response.user.uid)
        })
        .catch((error) => {
            alert(error.message);
           
        })
    }

    
    function submitter(event) {
        event.preventDefault();
        if(change) {
            handleSubmit();
        }else{
            setChange(true)
        }
    }

    return (
        <section className="login">
            <div className="sign-nav">
                <h1>FREE DATING</h1>
                <div className="logger">
                    <p>BRING BUSY PROFESSIONALS TOGETHER</p>
                    <NavLink to="/signUp"><button>Log In</button></NavLink>
                </div>
            </div>


            <div className="overall-sign">
                <div className="main-sign">
                    <ul>
                        <li className="noner">SIGN UP</li>
                        <li>CLICK</li>
                        <li>CONNECT</li>
                    </ul>
                    <h1 className="heading1">MEET FUN SINGLES!</h1>

                    <form className="login-form" >
                        <h1>START NOW</h1>
                        <p>Your perfect match is just a click away</p>
                        {change ? <div className="info">
                           <input type="text" placeholder="Create username" name="userName" onChange={gatherInfo} />
                           <input type="text" placeholder="Create password" name="password" onChange={gatherInfo}/>
                        </div> : <div className="form-info">
                        <div className="info">
                                <select name="gender" id="" onChange={gatherInfo}>
                                    <option>I am a</option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                </select>
                                <select name="age" id="" onChange={gatherInfo}>
                                    <option>Age 18-25</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                </select>
                                <input type="text" placeholder="Email" name="email" onChange={gatherInfo} />
                            </div>
                            <div className="info">
                                <select name="mate" id="" onChange={gatherInfo}>
                                    <option>Looking for?</option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                </select>
                                <input type="text" placeholder="City" name="city" onChange={gatherInfo}/>
                                <input type="number" placeholder="Phone" name="phoneNumber" onChange={gatherInfo} />
                            </div></div>}
                        <div className="log-btn">
                            <button onClick={submitter}>SUBMIT</button>
                        </div>
                        <div className="para">
                            <p>Many singles are searching for relationship, dive in now and</p>
                        </div>
                    </form>
                </div>
                <div className="bottom-links">
                    <NavLink className="btm-link">Contact</NavLink>
                    <NavLink className="btm-link">About Us</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Login;