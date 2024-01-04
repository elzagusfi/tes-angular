import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'app-root',
  templateUrl : './app.component.html',
  standalone : true
})
export class AppComponent implements OnInit {
  jumlahLampuTidakTerhubung : number = 0;
  maksimumLampuMenyalaBersamaan : number = 0;
  jumlahCaraPermutasi : number = 0;
  kartuAtasSetelah45Langkah : number = 0;
  kartuAtasSetelah50Langkah : number = 0;
  langkahUntukKartu2DiAtas : number = 0;

  ngOnInit() {
    this.hitungLampuTidakTerhubung();
    this.hitungMaksimumLampuMenyala();
    this.hitungCaraPermutasi();
    this.hitungKartuAtasSetelahAcak();
    this.kartuAtasSetelah45Langkah = this.hitungKartuAtasSetelahNLangkah(5, 45);
    this.kartuAtasSetelah50Langkah = this.hitungKartuAtasSetelahNLangkah(7, 50);
    this.langkahUntukKartu2DiAtas = this.hitungLangkahUntukKartuDiAtas(3, 2);
  }

  hitungLampuTidakTerhubung() {
    this.jumlahLampuTidakTerhubung = 0;

    for (let nomorLampu = 1; nomorLampu <= 30; nomorLampu++) {
      if (nomorLampu % 2 !== 0 && nomorLampu % 3 !== 0 && nomorLampu % 5 !== 0 && nomorLampu % 7 !== 0 && nomorLampu % 11 !== 0) {
        this.jumlahLampuTidakTerhubung++;
      }
    }

    console.log('a. Jumlah lampu yang tidak terhubung =', this.jumlahLampuTidakTerhubung);
  }

  hitungMaksimumLampuMenyala() {
    let maksimumLampuMenyala = 0;

    for (let nomorSaklar = 1; nomorSaklar <= 5; nomorSaklar++) {
      let jumlahLampuMenyala = 0;
      for (let nomorLampu = 1; nomorLampu <= 30; nomorLampu++) {
        if (this.apakahSaklarTerhubung(nomorSaklar, nomorLampu)) {
          jumlahLampuMenyala++;
        }
      }
      maksimumLampuMenyala = Math.max(maksimumLampuMenyala, jumlahLampuMenyala);
    }

    this.maksimumLampuMenyalaBersamaan = maksimumLampuMenyala;

    console.log('b. Jumlah maksimum lampu yang menyala bersamaan =', this.maksimumLampuMenyalaBersamaan);
  }

  apakahSaklarTerhubung(nomorSaklar : number, nomorLampu : number) : boolean {
    switch (nomorSaklar) {
      case 1 :
        return nomorLampu % 2 === 0;
      case 2 :
        return nomorLampu % 3 === 0;
      case 3 :
        return nomorLampu % 5 === 0;
      case 4 :
        return nomorLampu % 7 === 0;
      case 5 :
        return nomorLampu % 11 === 0;
      default :
        return false;
    }
  }

  hitungCaraPermutasi() {
    let jumlahCaraPermutasi = 0;

    for (let jumlahPermenAbi = 0; jumlahPermenAbi <= 6; jumlahPermenAbi++) {
      for (let jumlahPermenBibi = 0; jumlahPermenBibi <= 5; jumlahPermenBibi++) {
        let jumlahPermenCibi = 12 - jumlahPermenAbi - jumlahPermenBibi;
        if (jumlahPermenCibi > 6) {
          jumlahCaraPermutasi++;
        }
      }
    }

    this.jumlahCaraPermutasi = jumlahCaraPermutasi;

    console.log('3. Jumlah cara untuk mendistribusikan permen = ', this.jumlahCaraPermutasi);
  }

  hitungKartuAtasSetelahAcak() {
    let kartuAtasSetelah45Langkah = this.hitungKartuAtasSetelahNLangkah(5, 45);
    let kartuAtasSetelah50Langkah = this.hitungKartuAtasSetelahNLangkah(7, 50);
    let langkahUntukKartu2DiAtas = this.hitungLangkahUntukKartuDiAtas(3, 2);

    console.log('a. Kartu atas setelah 45 langkah pengacakan = ', kartuAtasSetelah45Langkah);
    console.log('b. Kartu atas setelah 50 langkah pengacakan = ', kartuAtasSetelah50Langkah);
    console.log('c. Jumlah langkah untuk mendapatkan kartu 2 di atas = ', langkahUntukKartu2DiAtas);
  }

  hitungKartuAtasSetelahNLangkah(N : number, langkah : number) : number {
    let kartu : number[] = Array.from({ length : 31 }, (_, i) => i + 1);

    for (let langkahPengacakan = 1; langkahPengacakan <= langkah; langkahPengacakan++) {
      let kartuAtasN = kartu.slice(-N);
      kartu = kartuAtasN.concat(kartu.slice(0, -N));
    }

    return kartu[0];
  }

  hitungLangkahUntukKartuDiAtas(N : number, kartuTarget : number) : number {
    let kartu : number[] = Array.from({ length : 31 }, (_, i) => i + 1);
    let langkah = 0;

    while (kartu[0] !== kartuTarget) {
      let kartuAtasN = kartu.slice(-N);
      kartu = kartuAtasN.concat(kartu.slice(0, -N));
      langkah++;
    }

    return langkah;
  }
}
