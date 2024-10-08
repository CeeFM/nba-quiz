import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("bball_user", JSON.stringify({
                        id: user.id,
                        right: user.right,
                        wrong: user.wrong,
                        username: user.username,
                        teamName: user.teamName,
                        fullName: user.fullName
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="title">NBA QUIZ aka POP A SHOT</h1>
                    <img className="login-img" src="https://media.tenor.com/X-p0PE-nVscAAAAd/seattle-supersonics-shawn-kemp.gif" />
                    <h2>Please sign in</h2>
                    <fieldset className="login-form">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register"><button className="btn btn-primary register btn-lg">Not a member yet?</button></Link>
            </section>
        </main>
    )
}