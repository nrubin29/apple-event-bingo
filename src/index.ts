import * as pug from 'pug';
import * as fs from 'node:fs/promises';

const eventId = process.argv[2] as EventId;
if (!eventId) {
    throw Error('eventId not specified.');
}

const data: AppleEventsJson = JSON.parse((await fs.readFile('data/events.json')).toString());
const event = data.events[eventId];

// Render templates
for (const template of ['index', 'edit']) {
    await fs.writeFile(
        `dist/${template}.html`,
        pug.renderFile(`templates/${template}.pug`, {
            pretty: true,
            ...event,
        }),
    );
}

// Copy static files
if (event.backgroundFile) {
    await fs.copyFile(`images/${eventId}/${event.backgroundFile}`, `dist/${event.backgroundFile}`);
}

await fs.copyFile(`images/${eventId}/hashflag.png`, 'dist/hashflag.png');
await fs.copyFile('assets/style.css', `dist/style.css`);
await fs.copyFile('assets/script.js', `dist/script.js`);
