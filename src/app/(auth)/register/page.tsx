import Container from "@/components/container";
import RegisterForm from "@/components/forms/manage-user-form/register-form";

const Register = () => {
    return (
        <Container>
            <div className="flex justify-center items-center">
                <RegisterForm />
            </div>
        </Container>
    );
}

export default Register;