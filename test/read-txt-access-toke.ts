const fs = require('fs');

export class GetAccessTokenFromTxtFile {

    static async readTxtFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/access_token.txt', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}