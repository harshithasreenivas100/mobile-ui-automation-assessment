import BasePage from './BasePage';
import { testId } from '../utils/platform';

class MenuPage extends BasePage {
  private readonly menuButton = testId('Menu');
  private readonly logoutButton = testId('LOGOUT');

  async logout(): Promise<void> {
    await this.tap(this.menuButton);
    await this.tap(this.logoutButton);
  }
}

export default new MenuPage();
