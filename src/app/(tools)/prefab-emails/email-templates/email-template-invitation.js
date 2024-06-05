const prefab = {
    expressions: {
        'name': 'NAME',
        'course': 'COURSE',
        /*get date(inWeeks = 3) {
            const weekdays = 7 * inWeeks;
            const date = new Date();

            date.setDate(date.getDate() + (((1 + weekDays - date.getDay()) % weekDays) || weekDays));

            return date; // returns the next monday in 3 weeks
        },
        get startDate() {
            const date = new Date(this.date);
            const [day, month, year] = [
                date.getDate(),
                date.getMonth(),
                date.getFullYear(),
            ];

            return `${day}-${month}-${year}`;
        },
        get startDateFull() {
            const date = new Date(this.date);
            const [day, month, year] = [
                date.getDate(),
                date.getMonth(),
                date.getFullYear(),
            ];

            return `${day}-${month}-${year}`;
        },*/
    },
    template: `
        Dag {name},

        Jij hebt een aanvraag gedaan voor het volgen van de opleiding <strong>{course}</strong> bij VDAB. Graag informeer ik of het voor jou mogelijk is om op <strong>{startDateFull}</strong> te starten met de opleiding?

        Wij hanteren een hybride opleidingsvorm. Dat betekent dat wij deels op kantoor werken (centrumleren) en deels thuis (thuisleren). Je bent 2 dagen per week aanwezig in het <a href="https://maps.app.goo.gl/hsFCuzR9NiSVCUyD9">opleidingscentrum T2-Campus te Genk</a>, de overige dagen werk je van thuis uit.

        Kan jij mij laten weten of je op <strong>{startDate}</strong> kan starten? Indien niet, dan bepalen we een andere startdatum. Zodra deze vast staat, volgt er een mail met meer informatie over de opleiding.

        Beschik je over een <strong>laptop</strong> om de opleiding te volgen? Indien niet, dan kan je gratis een laptop van VDAB in bruikleen krijgen zolang je de opleiding volgt. Deze laptop kan je zowel op de campus als thuis gebruiken.

        Nog even samengevat. Laat je mij weten:
        <ul>
            <li>of je kan starten op <strong>{startDate}</strong></li>
            <li>of je beschikt over een eigen laptop of een leenlaptop van de VDAB wil aanvragen</li>
        </ul>
        Gelieve mij te antwoorden ten laatste tegen <strong>het einde van deze week</strong>.

        Alvast bedankt.
    `,
};

export default prefab;
