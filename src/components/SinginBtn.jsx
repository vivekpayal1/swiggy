import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../utils/firebaseAuth"
import { useDispatch, useSelector } from "react-redux"
import { addUserData, removeUserData } from "../services/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { toggleLogin } from "../services/slices/toggleSlice"

function SigniBtn() {
    const userData = useSelector(store => store.authSlice.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(addUserData(userData))
        navigate('/')
        dispatch(toggleLogin())
    }
    async function handleRemoveUser() {
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(toggleLogin())
    }
    return <div>

        {userData ? <button className="text-base md:text-[20px]  bg-red-400 h-16 text-center align-middle w-full text-white font-bold" onClick={handleRemoveUser}>Logout</button> : <button onClick={handleAuth} className="text-base md:text-[20px]    bg-[#fc8019] h-16 text-center align-middle w-full text-white font-bold">
            Login with Google
        </button>}

    </div>
}
export default SigniBtn