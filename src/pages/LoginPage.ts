import BasePage from './BasePage';
import { containsText, testId } from '../utils/platform';

class LoginPage extends BasePage {
  // Same accessibility ids on both platforms (see utils/platform.ts for why `~test-*` and not `id=`).
  private readonly username = testId('Username');
  private readonly password = testId('Password');
  private readonly loginButton = testId('LOGIN');
  // Only rendered while an error is showing; the text lives in a child element.
  private readonly errorContainer = testId('Error message');

  async login(username: string, password: string): Promise<void> {
    await this.enterText(this.username, username);
    await this.enterText(this.password, password);
    await this.hideKeyboardIfShown();
    await this.tap(this.loginButton);
  }

  async isLoginScreenVisible(): Promise<boolean> {
    return this.isVisible(this.username);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(this.errorContainer);
  }

  async isErrorTextDisplayed(text: string): Promise<boolean> {
    return this.isVisible(containsText(text));
  }
}

export default new LoginPage();
