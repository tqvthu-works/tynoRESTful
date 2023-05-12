import { Validator } from '@core/http/validator';
import { ValidationChain, body } from 'express-validator';
import i18next from 'i18next';
import { User } from '@app/Models/User';

export class AuthRequest extends Validator {
    public async rules(): Promise<ValidationChain[]> {
        if (this.request.originalUrl == '/api/auth/register') {
            return this.setRegisterRules();
        }
        return [];
    }
    private async setRegisterRules(): Promise<ValidationChain[]> {
        const chains: ValidationChain[] = [
            body('username')
                .notEmpty()
                .withMessage(
                    i18next.t('validation.required', { attribute: 'username' }),
                )
                .bail()
                .custom(async (value, { req }) => {
                    const user = await User.findOne({
                        where: { username: value },
                        attributes: ['id'],
                    });
                    if (user) {
                        return Promise.reject(
                            i18next.t('validation.exists', {
                                attribute: 'username',
                            }),
                        );
                    }
                    return true;
                }),
            body('password')
                .notEmpty()
                .withMessage(
                    i18next.t('validation.required', { attribute: 'password' }),
                ),
        ];

        return chains;
    }
}
