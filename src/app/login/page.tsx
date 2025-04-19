"use client";

import Link from "next/link"
import { use, useState } from "react"

interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState(false);
  // Kollar att alla forms är ifyllda
  const isFormValid = () => {
    const { username, password } = formData
    const newErrors: Partial<FormData> = {}
    
    // Lägg till fler restraints ? (inga mellanrum på namn och lösenord m.m?)
    if (!username.trim()) newErrors.username = "Username is required"
    if (!password) newErrors.password = "Password is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true)
    
    try {
      console.log("Form", formData)

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      })
      if (res.ok) {
        setLoginError(false);
        window.location.href = "/"; // UseRouter funkar inte pga sidan behöver en page reload för att uppdatera
      } else {
        setLoginError(true);
        setFormData({
          username: "",
          password: ""
        });
      }
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-100 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-black ${errors.username ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-100 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-black ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          
          <Link 
            className="hover:text-red-600 text-red-500 font-medium flex  flex-col justify-center mb-6 text-center"
            href="/register"
          >
            <span className="text-slate-400">Don't have an account?</span>
            Create account
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in to account..." : "Login"}
          </button>
          {loginError ? (<span className="text-red-700 flex justify-center mt-2">Wrong password or username</span> ) : (null)}
        </form>
      </div>
    </div>
  );
}