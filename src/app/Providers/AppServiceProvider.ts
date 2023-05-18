import { AuthService } from '@app/Services/AuthService';
import { ServiceProvider } from '@core/contract';

export class AppServiceProvider implements ServiceProvider {
    public register(): void {
        this.bindServices();
    }
    public boot(): Promise<void> {
        return;
    }
    private bindServices(): void {
        container.bind('AuthService').to(AuthService);
    }
}
