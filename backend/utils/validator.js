
export const getValidationErrors = async (schema, data) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return []
    } catch(error) {
        return (error.errors)
    }
}