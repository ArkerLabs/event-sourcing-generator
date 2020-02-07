import * as fs from 'fs';
import * as path from 'path';
import { TemplateConfig } from './template-config';

export class Generator {

    private readonly templatesFolder = './templates/';

    async generate(
        templateName: string, 
        domain: string,
        name: string, 
        args?: { [key: string]: string; },
    ): Promise<void> {
        const className = this.className(name);
        const fileName = this.fileName(name);
        const domainName = this.fileName(domain);
        const templateFolder = this.getTemplateFolder(templateName);

        var config: TemplateConfig = JSON.parse(fs.readFileSync(templateFolder + 'config.json', 'utf8'));

        const templates = fs.readdirSync(templateFolder + 'files');

        for (const template of templates) {
            const content = fs.readFileSync(templateFolder + 'files/' + template, 'utf8')
                                .replace(/%name%/g, fileName)
                                .replace(/%className%/g, className);
            this.createFile(domainName + '/' + config.path + '/', template.replace('__name__', fileName), content);
        }
    }

    private createFile(filePath: string, fileName: string, contents: string) {
        if (!fs.existsSync(filePath)){
            fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(filePath + fileName, contents);
    }

    private getTemplateFolder(templateName: string): string {
        return path.join(__dirname, this.templatesFolder + templateName + '/');
    }

    private fileName(string: string) {
        return string.replace(/([a-z])([A-Z])/g, "$1-$2")
             .replace(/\s+/g, '-')
             .toLowerCase();
    }

    private className(string: string) {
        return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return "";
            return match.toUpperCase();
        }).replace('-', '');
    }

}
