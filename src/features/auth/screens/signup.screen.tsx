import SignupForm from "../components/signup/signupForm";
import SignupHero from "../components/signup/signupHero";

export default function SignupScreen(){
    return (
    <>
    <main className="py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-12 p-4">
            <SignupHero/>
            <SignupForm/>
        </div>
    </main>
    </>
    );
}