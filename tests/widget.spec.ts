import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();

    // Проверяем, что статьи загрузились
    expect(articles.length).toBeGreaterThan(0);

    await articles[0].click();

    await widgetPage.clickWriteToUs();

    // Проверяем заголовок
    const title = await widgetPage.getTitle();

    expect(title).toEqual('Связь с поддержкой');
  });
});
