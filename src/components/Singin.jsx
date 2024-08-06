import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../utils/firebaseAuth"
import { useDispatch } from "react-redux"
import { addUserData, removeUserData } from "../services/slices/authSlice"
import { useNavigate } from "react-router-dom"

function Signin() {
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
    }
    async function handleRemoveUser() {
        await signOut(auth)
        dispatch(removeUserData())
    }
    return <div>
        Google Sign in

        <button onClick={handleAuth} className="px-4 py-2 border flex gap-2 border-slate-200 text-black dark:border-slate-700 rounded-lg  dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span className="text-black">Login with Google</span>
        </button>
        <button onClick={handleRemoveUser}>Logout</button>

    </div>
}
export default Signin