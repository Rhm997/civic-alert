function validareCnp(el){
    if( ($(el).val() || '') != ''){
        if(!valideazaCNP(el)){
            $(el)
                .attr('placeholder', 'CNP Incorect')
                .val('')
                .parent().addClass('active-grey');
        }
    }
}
function valideazaCNP(el) {
    s = $(el).val() || '';
    
    if (s.length == 0) return false;
    if (s.length != 13) return false;

    for (i = 0; i < s.length; i++) {
        c = s.charAt(i);
        if (c < "0" || c > "9") return false;
    }

    if (s.charAt(0) == "0") return false;

    var sex = (s.charCodeAt(0) - "0".charCodeAt(0)) * 1;

    var an, luna, zi;
    an = 10 * (s.charCodeAt(1) - "0".charCodeAt(0)) + (s.charCodeAt(2) - "0".charCodeAt(0));

    if (s.charCodeAt(0) - "0".charCodeAt(0) < 3) an = 1900 + an;
    else if (s.charCodeAt(0) - "0".charCodeAt(0) < 5) an = 1800 + an;
    else if (s.charCodeAt(0) - "0".charCodeAt(0) < 7) an += 2000;
    else an += 1900;
    luna = 10 * (s.charCodeAt(3) - "0".charCodeAt(0)) + (s.charCodeAt(4) - "0".charCodeAt(0));

    zi = 10 * (s.charCodeAt(5) - "0".charCodeAt(0)) + (s.charCodeAt(6) - "0".charCodeAt(0));

    var corect = true;
    
    if (luna > 12 || luna < 1) corect = false;
    else if (zi < 1) corect = false;
    else if (luna == 1 || luna == 3 || luna == 5 || luna == 7 || luna == 8 || luna == 10 || luna == 12) {
        if (zi > 31) corect = false;
    } 
    else if (luna == 2 || luna == 4 || luna == 6 || luna == 9 || luna == 11) {
        if (zi > 30) corect = false;
    } 
    else if (an % 4 != 0 || an % 100 == 0) if (zi > 28) corect = false; else;
    else if (zi > 29) corect = false;
    
    if (!corect) return false;

    var judet = 10 * (s.charCodeAt(7) - "0".charCodeAt(0)) + (s.charCodeAt(8) - "0".charCodeAt(0));

    if (judet < 1 || judet > 52) return false;
    else {
        var lj = new Array();
        lj[01] = "Alba";
        lj[02] = "Arad";
        lj[03] = "Arges";
        lj[04] = "Bacau";
        lj[05] = "Bihor";
        lj[06] = "Bistrita-Nasaud";
        lj[07] = "Botosani";
        lj[08] = "Brasov";
        lj[09] = "Braila";
        lj[10] = "Buzau";
        lj[11] = "Caras-Severin";
        lj[12] = "Cluj";
        lj[13] = "Constanta";
        lj[14] = "Covasna";
        lj[15] = "Dambovita";
        lj[16] = "Dolj";
        lj[17] = "Galati";
        lj[18] = "Gorj";
        lj[19] = "Harghita";
        lj[20] = "Hunedoara";
        lj[21] = "Ialomita";
        lj[22] = "Iasi";
        lj[23] = "Ilfov";
        lj[24] = "Maramures";
        lj[25] = "Mehedinti";
        lj[26] = "Mures";
        lj[27] = "Neamt";
        lj[28] = "Olt";
        lj[29] = "Prahova";
        lj[30] = "Satu Mare";
        lj[31] = "Salaj";
        lj[32] = "Sibiu";
        lj[33] = "Suceava";
        lj[34] = "Teleorman";
        lj[35] = "Timis";
        lj[36] = "Tulcea";
        lj[37] = "Vaslui";
        lj[38] = "Valcea";
        lj[39] = "Vrancea";
        lj[40] = "Bucuresti";
        lj[41] = "Bucuresti S1";
        lj[42] = "Bucuresti S2";
        lj[43] = "Bucuresti S3";
        lj[44] = "Bucuresti S4";
        lj[45] = "Bucuresti S5";
        lj[46] = "Bucuresti S6";
        lj[51] = "Calarasi";
        lj[52] = "Giurgiu";
    }

    var tt = "279146358279";
    var suma = 0;
    for (i = 0; i < 12; i++){
        suma += (s.charCodeAt(i) - "0".charCodeAt(0)) * (tt.charCodeAt(i) - "0".charCodeAt(0));
    }

    var uc = suma % 11;
    if (uc == 10) uc = 1;
    if (uc == s.charCodeAt(12) - "0".charCodeAt(0)) corect = true;
    else corect = false;

    return corect;
}

async function checkLocuriDisponibile() {
    var locuri_disponibilie = true;
    await $.ajax({
        type: "GET",
        url: app.contextPath + "/nomenclatorController/queryGetParcariDisponibile",
        data: {
            tip_parcare: '1,5,10,11,12'
        },
        dataType: "json",
        success: function(response){
            if (response <= 0) {
                swalGeneral("", "Momentan nu se pot depune/modifica solicitări de rezervare", "info");
                insertLog(-1, '', '', 'Accesare loc parcare', 1106, 'Momentan nu se pot depune/modifica solicitări de rezervare.');
                locuri_disponibilie = false;
            } 
        }
    });
    return locuri_disponibilie;
}
