import Container from "@/components/container";
import LoginForm from "@/components/forms/manage-user-form/login-form";

const Login = () => {
    return (
        <Container>
            <div className="flex justify-center items-center">
                <LoginForm />
            </div>
        </Container>
    );
}

export default Login;