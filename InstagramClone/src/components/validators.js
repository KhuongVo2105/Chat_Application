import ValidationComponent from "react-native-form-validator";

export class CustomValidation extends ValidationComponent {
    isEmail(email) {
        // Validate email
        const isValid = this.validate({
            email: { email: true, required: true },
        });

        if (!isValid) {
            return {
                isValid: false,
                errorMessages: this.getErrorMessages(),
            };
        }

        return { isValid: true };
    }
}