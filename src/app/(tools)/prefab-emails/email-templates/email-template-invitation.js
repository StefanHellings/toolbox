export default class Prefab {
    label = 'Invitation';
    offsetInWeeks = 3;

    expressionsList = [
        'name',
        'course',
        'date',
    ];

    name = {
        type: 'string',
        default: 'John Doe',
        value: 'John Doe',
    };

    course = {
        type: 'choice',
        choices: [
            'Basisopleinding ICT ontwikkeling',
            'Enterprise Java Ontwikkelaar',
            '.NET ontwikkelaar met C#',
            'Full Stack developer',
        ],
        default: 'Basisopleinding ICT ontwikkeling',
        value: 'Basisopleinding ICT ontwikkeling',
    };

    date = {
        type: 'date',
        default: this.defaultDate(),
        value: this.defaultDate(),
    };

    defaultDate() {
        const weekdays = 7 * this.offsetInWeeks;
        const d = new Date();

        d.setDate(d.getDate() + (((1 + weekdays - d.getDay()) % weekdays) || weekdays));

        // console.log('defaultDate', d.toString());

        return d.toString();
    }

    dateToSimple(dateString) {
        const date = new Date(dateString);

        // Return this date into DD-MM-YYYY format
        return date.getDate() + '----' + (date.getMonth() + 1) + '-----' + date.getFullYear();
    }

    get email() {
        return `
           Dag ${this.name.value},

           Jij hebt een aanvraag gedaan voor het volgen van de opleiding <strong>${this.course.value}</strong> bij VDAB. Graag informeer ik of het voor jou mogelijk is om op <strong>${this.dateToSimple(this.date.value)}</strong> te starten met de opleiding?

           Wij hanteren een hybride opleidingsvorm. Dat betekent dat wij deels op kantoor werken (centrumleren) en deels thuis (thuisleren). Je bent 2 dagen per week aanwezig in het <a href="https://maps.app.goo.gl/hsFCuzR9NiSVCUyD9">opleidingscentrum T2-Campus te Genk</a>, de overige dagen werk je van thuis uit.

           Kan jij mij laten weten of je op <strong>${this.dateToSimple(this.date.value)}</strong> kan starten? Indien niet, dan bepalen we een andere startdatum. Zodra deze vast staat, volgt er een mail met meer informatie over de opleiding.

           Beschik je over een <strong>laptop</strong> om de opleiding te volgen? Indien niet, dan kan je gratis een laptop van VDAB in bruikleen krijgen zolang je de opleiding volgt. Deze laptop kan je zowel op de campus als thuis gebruiken.

           Nog even samengevat. Laat je mij weten:
           <ul>
               <li>of je kan starten op <strong>${this.date.value}</strong></li>
               <li>of je beschikt over een eigen laptop of een leenlaptop van de VDAB wil aanvragen</li>
           </ul>
           Gelieve mij te antwoorden ten laatste tegen <strong>het einde van deze week</strong>.

           Alvast bedankt.
       `;
    }
}
