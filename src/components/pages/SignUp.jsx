import Header from "../components/layout/Header"
import SignupForm from "../components/auth/SignupForm"

export default function Signup() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="flex justify-center items-center p-6">
        <SignupForm />
      </main>
    </div>
  )
}
