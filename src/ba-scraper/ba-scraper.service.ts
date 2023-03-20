import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as xpath from 'xpath'
import { DOMParser } from 'xmldom';
import puppeteer from 'puppeteer';


@Injectable()
export class BaScraperService {

    constructor() {

    }
    async getCSRF() {


        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        await page.goto('https://precodahora.ba.gov.br/')


        await page.waitForSelector("#fake-sbar")
        await page.click('#fake-sbar');
        await page.waitForSelector('#top-sbar');
        await page.focus('#top-sbar');
        await page.type('#top-sbar', 'banana', { delay: 100 })
        await page.keyboard.press('Enter')
        await page.waitForSelector('#search-results')
        const content = await page.content()
        const cookies = await page.cookies()

        let cookiesParsed = ''
        cookies.forEach(cookie => {
            cookiesParsed += `${cookie.name}=${cookie.value}; `
        })
        const doc = new DOMParser({
            locator: {},
            errorHandler: {
                warning: function (w) { },
                error: function (e) { },
                fatalError: function (e) { console.error(e) }
            }
        }).parseFromString(content)
        await browser.close()
        const csrf = xpath.select('//*[@id="validate"]/@data-id', doc) as any
        return { csrf: csrf[0].nodeValue, cookies: cookiesParsed }

    }

    async getProducts(csrfToken: string, cookies: string) {

        const config: AxiosRequestConfig = {
            responseType: "json",
            headers: {
                "X-CSRFToken": csrfToken,
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: cookies,
            },

        }
        const response = await axios.post('https://precodahora.ba.gov.br/produtos/', { termo: "feijao" }, config)
        return response.data?.resultado ?? {}
    }
}
