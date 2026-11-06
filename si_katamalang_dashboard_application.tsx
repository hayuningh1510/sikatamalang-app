import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Calendar, Users, Award, FileText, CheckCircle2, Clock, XCircle, 
  HelpCircle, Search, Filter, Plus, Edit, Eye, Send, Phone, Mail, Globe, 
  ChevronRight, ArrowRight, Shield, AlertTriangle, Image as ImageIcon,
  TrendingUp, Activity, PieChart as PieIcon, BarChart3, Heart, Star,
  Download, QrCode, LogIn, LogOut, UserCheck, Settings, BookOpen, Sparkles,
  Camera, Check, RefreshCw, Layers, Map as MapIcon, Share2, Building2, Briefcase
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// --- SEED DATA: 23 KAMPUNG TEMATIK KOTA MALANG ---
const INITIAL_VILLAGES = [
  {
    id: 'kpg-01',
    name: 'Kampung Warna-Warni Jodipan',
    category: 'Wisata & Seni Visual',
    status: 'Aktif',
    address: 'Jl. Juanda Gg. 1, Jodipan, Kec. Blimbing, Kota Malang',
    lat: -7.9836,
    lng: 112.6375,
    description: 'Kampung ikonik Malang dengan rumah-rumah bercat warna-warni megah di bantaran Sungai Brantas.',
    history: 'Inisiatif mahasiswa komunikasi UMM bersama korporasi cat pada tahun 2016 mengubah permukiman kumuh menjadi destinasi wisata kreatif dunia.',
    attractions: ['Jembatan Kaca Ngalam Indonesia', 'Spot Foto Mural 3D', 'Bantaran Sungai Brantas', 'Kerajinan Warga'],
    monthlyActivities: 14,
    visitorsThisMonth: 3450,
    rating: 4.8,
    potential: 'Ekonomi Kreatif, Pariwisata Visual, Pengelolaan Sampah Turis',
    assistanceNeeded: 'Digital Marketing & Manajemen Event Kebudayaan',
    managerName: 'Pak Suparto',
    managerContact: '0812-3456-7801',
    gallery: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-02',
    name: 'Kampung Budaya Polowijen',
    category: 'Budaya & Kesenian',
    status: 'Aktif',
    address: 'Jl. Candi Sewu, Polowijen, Kec. Blimbing, Kota Malang',
    lat: -7.9352,
    lng: 112.6514,
    description: 'Pusat pelestarian Tari Topeng Malangan, pembuatan rupa topeng kayu, dan perajin batik Malang.',
    history: 'Diresmikan tahun 2017 untuk menghidupkan kembali tradisi situs sejarah Mpu Purwa dan Ki Ken Dedes.',
    attractions: ['Sanggar Tari Topeng', 'Pahatan Topeng Kayu', 'Workshop Batik Polowijen', 'Perpustakaan Kampung'],
    monthlyActivities: 18,
    visitorsThisMonth: 1890,
    rating: 4.9,
    potential: 'Pendidikan Budaya, Kesenian Tradisional, Sentra Batik',
    assistanceNeeded: 'Diversifikasi Produk Souvenir & Dokumentasi Digital',
    managerName: 'Ki Seno (Isa Wahyudi)',
    managerContact: '0811-9876-5432',
    gallery: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-03',
    name: 'Kampung Tempe Sanan',
    category: 'UMKM & Kuliner',
    status: 'Aktif',
    address: 'Jl. Sanan Gg. 3, Purwantoro, Kec. Blimbing, Kota Malang',
    lat: -7.9588,
    lng: 112.6481,
    description: 'Sentra olahan tempe dan keripik tempe terbesar di Kota Malang yang menembus pasar nasional.',
    history: 'Industri rumah tangga olahan tempe yang telah diwariskan turun-temurun sejak era 1970-an.',
    attractions: ['Wisata Edukasi Pembuatan Tempe', 'Sentra Belanja Keripik Tempe', 'Olahan Bio-gas Olahan Limbah'],
    monthlyActivities: 22,
    visitorsThisMonth: 5120,
    rating: 4.7,
    potential: 'Wisata Edukasi Kuliner, Pengolahan Limbah Energi, Ekspor Keripik',
    assistanceNeeded: 'Inovasi Kemasan Produk & Sertifikasi Halal/BPOM',
    managerName: 'Ibu Hajah Lilik',
    managerContact: '0813-4455-6677',
    gallery: [
      'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-04',
    name: 'Kayutangan Heritage',
    category: 'Sejarah & Arsitektur',
    status: 'Aktif',
    address: 'Jl. Basuki Rahmat, Kauman, Kec. Klojen, Kota Malang',
    lat: -7.9785,
    lng: 112.6312,
    description: 'Kawasan pemukiman bersejarah bernuansa kolonial abad 19 dengan arsitektur antik yang terawat.',
    history: 'Jalur perdagangan kuno Kota Malang yang bertransformasi menjadi koridorHeritage bernilai sejarah tinggi.',
    attractions: ['Rumah Kolonial Abad 19', 'Mbah Honggo Shrine', 'Kopi Mbah Cokro', 'Spot Foto Vintage'],
    monthlyActivities: 25,
    visitorsThisMonth: 8900,
    rating: 4.9,
    potential: 'Wisata Sejarah, Fotografi Arsitektur, Cafe Vintage, Musik Jazz',
    assistanceNeeded: 'Pengaturan Lalu Lintas & Restorasi Bangunan Kuno',
    managerName: 'Mas Rizal',
    managerContact: '0857-1122-3344',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-05',
    name: 'Kampung Keramik Dinoyo',
    category: 'Kerajinan & Kesenian',
    status: 'Aktif',
    address: 'Jl. MT Haryono IX, Dinoyo, Kec. Lowokwaru, Kota Malang',
    lat: -7.9442,
    lng: 112.6105,
    description: 'Sentra kerajinan keramik porselen dan gerabah khas Malang sejak puluhan tahun.',
    history: 'Pusat produksi keramik tradisional yang berkembang sejak era 1950-an berdekatan dengan kampus Unbraw.',
    attractions: ['Workshop Cetak & Lukis Keramik', 'Galeri Gerabah Unik', 'Edukasi Keramik Anak'],
    monthlyActivities: 12,
    visitorsThisMonth: 1420,
    rating: 4.6,
    potential: 'Edukasi Seni Kriya, Kerajinan Ekspor, Souvenir Custom',
    assistanceNeeded: 'Pemasaran E-Commerce & Peremajaan Alat Pembakaran',
    managerName: 'Pak Syamsul',
    managerContact: '0821-9988-7766',
    gallery: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-06',
    name: 'Kampung Biru Arema',
    category: 'Olahraga & Kebanggaan Lokal',
    status: 'Aktif',
    address: 'Kiduldalam, Kec. Klojen, Kota Malang',
    lat: -7.9818,
    lng: 112.6360,
    description: 'Kampung serba biru sebagai wujud identitas dan kebanggaan terhadap klub sepak bola Arema Malang.',
    history: 'Diresmikan 2018 sebagai pengimbang visual Kampung Warna-Warni di seberang rel kereta api.',
    attractions: ['Museum Arema Mini', 'Mural Legend Arema', 'Spot View Stasiun Malang'],
    monthlyActivities: 10,
    visitorsThisMonth: 2100,
    rating: 4.5,
    potential: 'Wisata Tematik Sepak Bola, Merchandise Lokal, Kuliner Malam',
    assistanceNeeded: 'Penyegaran Cat Dinding & Manajemen Kebersihan',
    managerName: 'Nawak Sam Eko',
    managerContact: '0812-7777-8888',
    gallery: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-07',
    name: 'Kampung Glintung Go Green (3G)',
    category: 'Lingkungan & Ekowisata',
    status: 'Aktif',
    address: 'Purwantoro, Kec. Blimbing, Kota Malang',
    lat: -7.9490,
    lng: 112.6410,
    description: 'Kampung konservasi lingkungan berbasis partisipasi warga dengan ribuan biopori dan tanaman hidroponik.',
    history: 'Pelopor Kampung Konservasi Air yang berhasil menurunkan tingkat banjir wilayah melalui gerakan kemandirian warga.',
    attractions: ['Stasiun Sumur Resapan Biopori', 'Lorong Hijau Hidroponik', 'Edukasi Urban Farming'],
    monthlyActivities: 15,
    visitorsThisMonth: 1650,
    rating: 4.8,
    potential: 'Studi Banding Lingkungan, Inovasi Biopori, Riset Ketahanan Pangan',
    assistanceNeeded: 'Pengembangan Teknologi Penyiraman Otomatis',
    managerName: 'Bambang Irianto',
    managerContact: '0811-3322-1100',
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-08',
    name: 'Kampung Payung Pandanwangi',
    category: 'Kerajinan & Seni',
    status: 'Aktif',
    address: 'Pandanwangi, Kec. Blimbing, Kota Malang',
    lat: -7.9520,
    lng: 112.6620,
    description: 'Pusat pembuatan kerajinan payung kertas tradisional bergaya klasik Malang.',
    history: 'Revitalisasi tradisi pembuat payung kertas tradisional khas adat Jawa.',
    attractions: ['Workshop Melukis Payung Kertas', 'Sentra Souvenir Kertas', 'Festival Payung'],
    monthlyActivities: 9,
    visitorsThisMonth: 980,
    rating: 4.6,
    potential: 'Kriya Tradisional, Edukasi Kesenian Sekolah, Properti Seni',
    assistanceNeeded: 'Regenerasi Perajin Muda & Akses Bahan Baku Kertas Khusus',
    managerName: 'Mbah Karto',
    managerContact: '0852-3344-5566',
    gallery: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-09',
    name: 'Kampung Topeng Desaku Menari',
    category: 'Budaya & Rekreasi',
    status: 'Aktif',
    address: 'Tlogowaru, Kec. Kedungkandang, Kota Malang',
    lat: -8.0200,
    lng: 112.6450,
    description: 'Kampung relokasi eks-gelandangan dan pengemis yang diberdayakan menjadi pengrajin topeng gigantis.',
    history: 'Program pembinaan sosial Kementerian Sosial bersama Pemkot Malang diubah menjadi destinasi rekreasi warga.',
    attractions: ['Patung Topeng Raksasa 9 Meter', 'Taman Bermain Anak', 'Panggung Kesenian'],
    monthlyActivities: 11,
    visitorsThisMonth: 1240,
    rating: 4.4,
    potential: 'Pemberdayaan Sosial, Pentas Seni Rakyat, Tempat Rekreasi Keluarga',
    assistanceNeeded: 'Pendampingan Manajemen Usaha Pengelola & Pendataan',
    managerName: 'Pak Hadi',
    managerContact: '0812-9900-1122',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kpg-10',
    name: 'Kampung Tridi Kesatrian',
    category: 'Seni Visual & Fotografi',
    status: 'Aktif',
    address: 'Kesatrian, Kec. Blimbing, Kota Malang',
    lat: -7.9825,
    lng: 112.6390,
    description: 'Kampung tetangga Jodipan yang dipenuhi ratusan gambar lukisan tiga dimensi interaktif.',
    history: 'Digagas oleh seniman lukis lokal Malang untuk melengkapi koridor wisata bantaran sungai.',
    attractions: ['Ratusan Lukisan Trick Art 3D', 'Jembatan Kaca View', 'Wahana Flying Fox'],
    monthlyActivities: 8,
    visitorsThisMonth: 2300,
    rating: 4.6,
    potential: 'Fotografi Unik, Wahana Adrenalin Ringan, Kuliner Warga',
    assistanceNeeded: 'Maintenance Dinding Lukisan & Keamanan Wahana',
    managerName: 'Mas Taufik',
    managerContact: '0878-5544-3322',
    gallery: [
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80'
    ]
  },
  // 8 PASIF VILLAGES
  {
    id: 'kpg-11',
    name: 'Kampung Gerabah Penanggungan',
    category: 'Kerajinan',
    status: 'Pasif',
    address: 'Penanggungan, Kec. Klojen, Kota Malang',
    lat: -7.9610,
    lng: 112.6180,
    description: 'Kampung perajin alat-alat dapur tanah liat tradisional yang mengalami penurunan regenerasi.',
    history: 'Dahulu merupakan pemasok utama cobek dan tempayan tanah liat di Pasar Besar Malang.',
    attractions: ['Toko Gerabah Antik', 'Tembikar Tradisional'],
    monthlyActivities: 3,
    visitorsThisMonth: 320,
    rating: 4.1,
    potential: 'Kerajinan Tanah Liat, Edukasi Tradisional',
    assistanceNeeded: 'Manajemen Keorganisasian & Pemasaran Digital',
    managerName: 'Pak Sugeng',
    managerContact: '0813-1111-2222',
    gallery: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-12',
    name: 'Kampung Arab Pasar Besar',
    category: 'Sejarah & Kuliner',
    status: 'Pasif',
    address: 'Mergosono, Kec. Kedungkandang, Kota Malang',
    lat: -7.9890,
    lng: 112.6320,
    description: 'Kawasan permukiman bernuansa Timur Tengah dengan ragam kuliner kambing dan parfum khas.',
    history: 'Permukiman saudagar Timur Tengah yang menetap sejak awal abad ke-20.',
    attractions: ['Kuliner Nasi Kebuli & Roti Maryam', 'Toko Parfum & Minyak Wangi Custom'],
    monthlyActivities: 2,
    visitorsThisMonth: 650,
    rating: 4.3,
    potential: 'Wisata Kuliner Timur Tengah, Perdagangan Busana Muslim',
    assistanceNeeded: 'Branding Kawasan Wisata & Event Branding',
    managerName: 'Habib Ahmad',
    managerContact: '0812-4433-2211',
    gallery: ['https://images.unsplash.com/photo-1541518763669-27fef04b14da?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-13',
    name: 'Kampung Bamboo Mewek Park',
    category: 'Ekowisata',
    status: 'Pasif',
    address: 'Tunjungsekar, Kec. Lowokwaru, Kota Malang',
    lat: -7.9280,
    lng: 112.6350,
    description: 'Kawasan konservasi hutan bambu dan mata air alami di pinggiran kota.',
    history: 'Gerakan penanaman bambu warga untuk menjaga resapan air sumber Mewek.',
    attractions: ['Hutan Bambu Alami', 'Kolam Pemancingan', 'Gazebo Warga'],
    monthlyActivities: 2,
    visitorsThisMonth: 410,
    rating: 4.2,
    potential: 'Ekowisata Bambu, Outbound Organisasi, Sentra Kerajinan Bambu',
    assistanceNeeded: 'Pendanaan Fasilitas Umum & Perbaikan Akses Jalan',
    managerName: 'Pak Djoko',
    managerContact: '0856-7788-9900',
    gallery: ['https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-14',
    name: 'Kampung Lampion Juanda',
    category: 'Kerajinan Light & Dekoratif',
    status: 'Pasif',
    address: 'Jodipan, Kec. Blimbing, Kota Malang',
    lat: -7.9850,
    lng: 112.6380,
    description: 'Sentra pembuatan lampion hias untuk festival dan dekorasi taman.',
    history: 'Didirikan oleh pengrajin las dan kain dekorasi untuk memasok lampion ke Malang Night Paradise.',
    attractions: ['Showroom Lampion Terbang & Taman', 'Workshop Rangka Besi Lampion'],
    monthlyActivities: 4,
    visitorsThisMonth: 280,
    rating: 4.0,
    potential: 'Industri Kriya Dekorasi, Event Lighting',
    assistanceNeeded: 'Kemitraan Pemasaran Hotel & Pemerintah',
    managerName: 'Mas Denny',
    managerContact: '0819-0011-2233',
    gallery: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-15',
    name: 'Kampung Herbal Sukun',
    category: 'Kesehatan & Lingkungan',
    status: 'Pasif',
    address: 'Sukun, Kec. Sukun, Kota Malang',
    lat: -7.9980,
    lng: 112.6190,
    description: 'Kampung pemanfaatan pekarangan rumah untuk budidaya tanaman obat keluarga (TOGA).',
    history: 'Inisiatif kelompok ibu-ibu PKK Sukun dalam memproduksi minuman jamu herbal instan.',
    attractions: ['Kebun Tanaman Obat TOGA', 'Icip-icip Jamu Rempah Tradisional'],
    monthlyActivities: 1,
    visitorsThisMonth: 150,
    rating: 4.2,
    potential: 'Produk Herbal Organik, Edukasi Kesehatan Alami',
    assistanceNeeded: 'Izin Edar BPOM & Kemasan Produk Modern',
    managerName: 'Ibu Endang',
    managerContact: '0813-8899-0011',
    gallery: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-16',
    name: 'Kampung Nila Sliring',
    category: 'Perikanan & Resto',
    status: 'Pasif',
    address: 'Pand anwangi, Kec. Blimbing, Kota Malang',
    lat: -7.9540,
    lng: 112.6580,
    description: 'Budidaya ikan nila dengan sistem kolam terintegrasi aliran irigasi bersih.',
    history: 'Kelompok tani pembudidaya ikan air tawar di area saluran irigasi teknis.',
    attractions: ['Kolam Pemancingan Nila', 'Warung Bakar Ikan Fresh'],
    monthlyActivities: 2,
    visitorsThisMonth: 530,
    rating: 4.3,
    potential: 'Wisata Kuliner Ikan, Edukasi Budidaya Perikanan',
    assistanceNeeded: 'Pengolahan Pakan Mandiri & Branding Resto',
    managerName: 'Pak Yudi',
    managerContact: '0812-2233-4455',
    gallery: ['https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-17',
    name: 'Kampung Karangbesuki Sejarah',
    category: 'Sejarah & Purbakala',
    status: 'Pasif',
    address: 'Karangbesuki, Kec. Sukun, Kota Malang',
    lat: -7.9710,
    lng: 112.6050,
    description: 'Situs peninggalan Candi Badut dan prasasti dinoyo abad ke-8.',
    history: 'Kawasan tertua sejarah Malang yang mencatat berdiri Kerajaan Kanjuruhan.',
    attractions: ['Situs Candi Badut', 'Museum Mini Purbakala'],
    monthlyActivities: 3,
    visitorsThisMonth: 620,
    rating: 4.5,
    potential: 'Wisata Sejarah Kuno, Penelitian Arkeologi',
    assistanceNeeded: 'Papan Informasi Interaktif & Tour Guide Terlatih',
    managerName: 'Pak Suwandi',
    managerContact: '0857-4455-6677',
    gallery: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-18',
    name: 'Kampung Asri Lowokwaru',
    category: 'Lingkungan',
    status: 'Pasif',
    address: 'Lowokwaru, Kec. Lowokwaru, Kota Malang',
    lat: -7.9410,
    lng: 112.6200,
    description: 'Kampung percontohan pengolahan sampah organik dengan komposter maggot BSF.',
    history: 'Inisiatif RT ramah sampah yang sukses menekan pembuangan sampah ke TPA.',
    attractions: ['Pusat Kompos Maggot BSF', 'Taman Daur Ulang Plastik'],
    monthlyActivities: 2,
    visitorsThisMonth: 190,
    rating: 4.1,
    potential: 'Pengolahan Sampah Mandiri, Pupuk Organik',
    assistanceNeeded: 'Mesin Pencacah Plastik & Pemasaran Pupuk',
    managerName: 'Pak Ridwan',
    managerContact: '0812-6677-8899',
    gallery: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80']
  },
  // 5 DORMAN VILLAGES
  {
    id: 'kpg-19',
    name: 'Kampung Sanepo Sastra',
    category: 'Literasi & Kebudayaan',
    status: 'Dorman',
    address: 'Cemorokandang, Kec. Kedungkandang, Kota Malang',
    lat: -7.9750,
    lng: 112.6700,
    description: 'Kampung pegiat naskah kuno Jawa dan saung baca anak yang memerlukan revitalisasi keorganisasian.',
    history: 'Sempat menjadi pusat gerakan literasi anak di pinggiran kota Malang pada tahun 2018.',
    attractions: ['Saung Baca Tradisional', 'Naskah Kuno Macapat'],
    monthlyActivities: 0,
    visitorsThisMonth: 20,
    rating: 3.8,
    potential: 'Literasi Anak, Pelestarian Bahasa Jawa',
    assistanceNeeded: 'Restrukturisasi Pengelola & Pendampingan Pemuda',
    managerName: 'Mbah Jo',
    managerContact: '0813-0000-1111',
    gallery: ['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-20',
    name: 'Kampung Lukis Kedungkandang',
    category: 'Seni Rupa',
    status: 'Dorman',
    address: 'Kedungkandang, Kec. Kedungkandang, Kota Malang',
    lat: -7.9950,
    lng: 112.6500,
    description: 'Kampung perkumpulan pelukis kanvas yang vakum kegiatan akibat kendala pendanaan.',
    history: 'Komunitas pelukis lansia yang dahulu aktif menggelar pameran terbuka di sepanjang lorong.',
    attractions: ['Studio Galeri Lukis Rumah Warga'],
    monthlyActivities: 0,
    visitorsThisMonth: 15,
    rating: 3.9,
    potential: 'Galeri Lukis Terbuka, Workshop Seni Rupa',
    assistanceNeeded: 'Modal Bahan Lukis & Event Pameran Kolaboratif',
    managerName: 'Pak Kartono',
    managerContact: '0852-1122-3344',
    gallery: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-21',
    name: 'Kampung Susu Sawojajar',
    category: 'Peternakan & Olahan',
    status: 'Dorman',
    address: 'Sawojajar, Kec. Kedungkandang, Kota Malang',
    lat: -7.9680,
    lng: 112.6550,
    description: 'Sentra perah sapi perkotaan yang terhenti operasi karena alih fungsi lahan permukiman.',
    history: 'Kawasan peternakan sapi perah keluarga yang beroperasi sejak era 1990.',
    attractions: ['Kandang Perah Sapi Sisa Operasional'],
    monthlyActivities: 0,
    visitorsThisMonth: 40,
    rating: 3.5,
    potential: 'Olahan Keju/Yogurt, Edukasi Ternak',
    assistanceNeeded: 'Relokasi Lahan Peternakan & Pendampingan Usaha Baru',
    managerName: 'Pak Nanang',
    managerContact: '0819-3344-5566',
    gallery: ['https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-22',
    name: 'Kampung Olahraga Tasikmadu',
    category: 'Olahraga',
    status: 'Dorman',
    address: 'Tasikmadu, Kec. Lowokwaru, Kota Malang',
    lat: -7.9150,
    lng: 112.6250,
    description: 'Kampung fasilitas pencak silat dan panahan tradisional yang kehilangan partisipan remaja.',
    history: 'Padepokan silat tradisional yang pernah menorehkan prestasi di kejuaraan daerah.',
    attractions: ['Lapangan Panahan Tradisional', 'Padepokan Silat'],
    monthlyActivities: 0,
    visitorsThisMonth: 10,
    rating: 3.7,
    potential: 'Pelatihan Bela Diri Tradisional, Wisata Olahraga',
    assistanceNeeded: 'Promosi Program Pemuda & Perbaikan Perlatan Panahan',
    managerName: 'Coach Agus',
    managerContact: '0812-9988-1122',
    gallery: ['https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'kpg-23',
    name: 'Kampung Jamu Kotalama',
    category: 'Kesehatan Tradisional',
    status: 'Dorman',
    address: 'Kotalama, Kec. Kedungkandang, Kota Malang',
    lat: -7.9910,
    lng: 112.6390,
    description: 'Sentra penjual jamu gendong bersejarah yang menyusut jumlah perajinnya.',
    history: 'Tradisi racik jamu asam kunyit dan beras kencur legendaris di Kota Malang.',
    attractions: ['Dapur Racik Jamu Kuno'],
    monthlyActivities: 0,
    visitorsThisMonth: 30,
    rating: 4.0,
    potential: 'Kesehatan Tradisional Heritage, Minuman Sehat Lokal',
    assistanceNeeded: 'Modernisasi Produk Botol & Regenerasi Penjual',
    managerName: 'Mbok Sumi',
    managerContact: '0856-1234-5678',
    gallery: ['https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80']
  }
];

const INITIAL_ACTIVITIES = [
  {
    id: 'act-101',
    villageId: 'kpg-03',
    villageName: 'Kampung Tempe Sanan',
    title: 'Pelatihan Diversifikasi Produk Olahan Keripik Rasa Monster',
    category: 'Pelatihan UMKM',
    date: '2026-11-02',
    description: 'Inovasi pembuatan keripik tempe dengan perisa pedas manis dan pengemasan kedap udara untuk daya tahan 6 bulan.',
    status: 'Disetujui',
    participants: 45,
    visitors: 230,
    photo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-102',
    villageId: 'kpg-02',
    villageName: 'Kampung Budaya Polowijen',
    title: 'Festival Gebyar Tari Topeng Malangan 2026',
    category: 'Festival Budaya',
    date: '2026-10-28',
    description: 'Pertunjukan kolosal 100 penari topeng muda Malang menyambut hari Sumpah Pemuda.',
    status: 'Disetujui',
    participants: 120,
    visitors: 1450,
    photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-103',
    villageId: 'kpg-01',
    villageName: 'Kampung Warna-Warni Jodipan',
    title: 'Kerja Bakti Pembersihan Bantaran Sungai & Cat Ulang Mural',
    category: 'Lingkungan',
    date: '2026-10-20',
    description: 'Pengecatan ulang jembatan dan pembersihan alur sungai bekerjasama dengan komunitas pecinta alam.',
    status: 'Disetujui',
    participants: 80,
    visitors: 500,
    photo: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-104',
    villageId: 'kpg-04',
    villageName: 'Kayutangan Heritage',
    title: 'Kayutangan Jazz Malam Minggu & Pasar Lawang',
    category: 'Musik & Ekonomi',
    date: '2026-11-04',
    description: 'Pentas musik jazz jalanan berpadu dengan lapak jajanan kue tradisional Malang kuno.',
    status: 'Disetujui',
    participants: 35,
    visitors: 3200,
    photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-105',
    villageId: 'kpg-07',
    villageName: 'Kampung Glintung Go Green (3G)',
    title: 'Workshop Panen Sayur Hidroponik Perkotaan',
    category: 'Edukasi Lingkungan',
    date: '2026-11-01',
    description: 'Edukasi cara bertanam di lahan terbatas urban bagi siswa sekolah dasar se-Kota Malang.',
    status: 'Disetujui',
    participants: 60,
    visitors: 310,
    photo: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  }
];

const INITIAL_EVENTS = [
  {
    id: 'evt-01',
    villageId: 'kpg-04',
    villageName: 'Kayutangan Heritage',
    title: 'Pameran Foto Sejarah Malang Tempo Doeloe',
    date: '2026-11-15',
    time: '09:00 - 21:00 WIB',
    category: 'Sejarah & Seni',
    location: 'Koridor Rumah Kolonial Gg. 4',
    description: 'Menampilkan 150 arsip foto langka perkembangan Kota Malang dari tahun 1910 hingga 1980.'
  },
  {
    id: 'evt-02',
    villageId: 'kpg-02',
    villageName: 'Kampung Budaya Polowijen',
    title: 'Workshop Kilat Ukir Topeng Malang Bagi Mahasiswa',
    date: '2026-11-20',
    time: '13:00 - 17:00 WIB',
    category: 'Pelatihan Seni',
    location: 'Sanggar Utama KBP',
    description: 'Belajar dasar-dasar memahat karakter Malang dari bahan kayu pule bersama maestro lokal.'
  },
  {
    id: 'evt-03',
    villageId: 'kpg-05',
    villageName: 'Kampung Keramik Dinoyo',
    title: 'Bazar Keramik & Fun Pottery Class Weekend',
    date: '2026-11-22',
    time: '08:00 - 15:00 WIB',
    category: 'Wisata Edukasi',
    location: 'Sentra Keramik Dinoyo',
    description: 'Diskon besar keramik porselen tanah air dan kesempatan membuat vas bunga karya sendiri.'
  }
];

const INITIAL_COLLABORATIONS = [
  {
    id: 'KOL-2026-8812',
    applicantName: 'Dr. Ahmad Fauzi, M.Si.',
    organization: 'Universitas Brawijaya (Fakultas Ilmu Budaya)',
    email: 'ahmad.fauzi@ub.ac.id',
    phone: '0812-9988-4433',
    applicantType: 'Akademisi / Peneliti',
    targetVillageId: 'kpg-02',
    targetVillageName: 'Kampung Budaya Polowijen',
    purpose: 'Riset Pemetaan Digital Aset Tari Topeng Malangan',
    activityForm: 'Pengabdian Masyarakat & Hibah Penelitian',
    collaborationCategory: 'Pendidikan & Budaya',
    plannedDate: '2026-12-01',
    estimatedParticipants: 25,
    additionalNotes: 'Mohon fasilitasi wawancara dengan 3 tokoh perajin senior.',
    status: 'Menunggu Pengelola',
    submittedAt: '2026-11-04'
  },
  {
    id: 'KOL-2026-9041',
    applicantName: 'Nadia Salsabila',
    organization: 'Komunitas Malang Photo Club',
    email: 'nadia.photo@gmail.com',
    phone: '0857-3322-1144',
    applicantType: 'Komunitas / Komunitas Kreatif',
    targetVillageId: 'kpg-01',
    targetVillageName: 'Kampung Warna-Warni Jodipan',
    purpose: 'Lomba Fotografi Human Interest & Pembelian Souvenir Warga',
    activityForm: 'Event Komunitas & Promosi Digital',
    collaborationCategory: 'Pariwisata & Seni',
    plannedDate: '2026-11-28',
    estimatedParticipants: 100,
    additionalNotes: 'Membutuhkan ruang kumpul outdoor untuk pengumuman pemenang.',
    status: 'Disetujui',
    submittedAt: '2026-11-01'
  }
];

// --- APP MAIN COMPONENT ---
export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState('public'); // 'public', 'manager', 'admin'
  const [activeTab, setActiveTab] = useState('beranda'); // Nav tabs
  const [selectedVillage, setSelectedVillage] = useState(null); // Profile Modal or Page
  
  // Data States synchronized with LocalStorage
  const [villages, setVillages] = useState(() => {
    const saved = localStorage.getItem('sikat_villages');
    return saved ? JSON.parse(saved) : INITIAL_VILLAGES;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('sikat_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('sikat_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [collaborations, setCollaborations] = useState(() => {
    const saved = localStorage.getItem('sikat_collaborations');
    return saved ? JSON.parse(saved) : INITIAL_COLLABORATIONS;
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('sikat_feedbacks');
    return saved ? JSON.parse(saved) : [
      { id: 'fb-1', villageName: 'Kampung Warna-Warni Jodipan', rating: 5, comment: 'Sangat indah dan bersih! Warga ramah menyambut turis.', date: '2026-11-03' },
      { id: 'fb-2', villageName: 'Kayutangan Heritage', rating: 5, comment: 'Suasana malam hari luar biasa dengan kopi tradisional.', date: '2026-11-02' }
    ];
  });

  // Selected manager logged in context
  const [managerVillageId, setManagerVillageId] = useState('kpg-03'); // Default manager for Kampung Tempe Sanan

  // Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('sikat_villages', JSON.stringify(villages));
  }, [villages]);

  useEffect(() => {
    localStorage.setItem('sikat_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('sikat_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('sikat_collaborations', JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem('sikat_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Derived Statistics
  const stats = useMemo(() => {
    const total = villages.length;
    const active = villages.filter(v => v.status === 'Aktif').length;
    const passive = villages.filter(v => v.status === 'Pasif').length;
    const dormant = villages.filter(v => v.status === 'Dorman').length;
    return { total, active, passive, dormant };
  }, [villages]);

  // Monthly activities chart data dynamic calculation
  const monthlyData = useMemo(() => {
    return [
      { month: 'Jun', Submitted: 12, Approved: 10 },
      { month: 'Jul', Submitted: 18, Approved: 15 },
      { month: 'Agu', Submitted: 22, Approved: 20 },
      { month: 'Sep', Submitted: 28, Approved: 24 },
      { month: 'Okt', Submitted: 35, Approved: 30 },
      { month: 'Nov', Submitted: activities.length + 5, Approved: activities.filter(a => a.status === 'Disetujui').length }
    ];
  }, [activities]);

  // Handle Switch Role
  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'manager') {
      setActiveTab('manager-overview');
    } else if (role === 'admin') {
      setActiveTab('admin-overview');
    } else {
      setActiveTab('beranda');
    }
    showToast(`Beralih ke mode: ${role === 'public' ? 'Pengunjung Publik' : role === 'manager' ? 'Pengelola Kampung' : 'Administrator Pemkot'}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white transition-all transform animate-bounce ${
          toast.type === 'error' ? 'bg-rose-600' : 'bg-teal-700'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* SYSTEM ROLE BAR & NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md">
        {/* Prototype Role Switcher Bar */}
        <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-teal-400 font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>MODE PROTOTIPE SI-KATAMALANG (SIMULASI SUPABASE & DB)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg">
            <span className="text-slate-400 px-2 text-[11px] hidden sm:inline">Pilih Akses:</span>
            <button 
              onClick={() => switchRole('public')} 
              className={`px-3 py-1 rounded-md transition text-xs font-medium ${currentRole === 'public' ? 'bg-teal-600 text-white font-bold shadow' : 'text-slate-300 hover:bg-slate-700'}`}>
              Public View
            </button>
            <button 
              onClick={() => switchRole('manager')} 
              className={`px-3 py-1 rounded-md transition text-xs font-medium ${currentRole === 'manager' ? 'bg-amber-600 text-white font-bold shadow' : 'text-slate-300 hover:bg-slate-700'}`}>
              Pengelola Kampung
            </button>
            <button 
              onClick={() => switchRole('admin')} 
              className={`px-3 py-1 rounded-md transition text-xs font-medium ${currentRole === 'admin' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-300 hover:bg-slate-700'}`}>
              Administrator
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('beranda'); setCurrentRole('public'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-900 font-extrabold shadow-lg shadow-teal-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
                SI-KATAMALANG
              </span>
              <p className="text-[10px] text-teal-400 font-medium tracking-wider uppercase">Kota Malang</p>
            </div>
          </div>

          {/* Navigation Links according to Active Role */}
          {currentRole === 'public' && (
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'peta', label: 'Peta Kampung' },
                { id: 'daftar', label: 'Daftar Kampung' },
                { id: 'kalender', label: 'Kalender Kegiatan' },
                { id: 'kolaborasi', label: 'Potensi & Kolaborasi' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSelectedVillage(null); }}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === item.id 
                      ? 'bg-teal-700/50 text-teal-300 border border-teal-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {currentRole === 'manager' && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-medium">
                Pengelola: {villages.find(v => v.id === managerVillageId)?.name || 'Kampung Tempe Sanan'}
              </span>
            </div>
          )}

          {currentRole === 'admin' && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-semibold">
                Bappeda & Disporapar Kota Malang
              </span>
            </div>
          )}

          {/* Right Action Button */}
          <div className="flex items-center gap-2">
            {currentRole === 'public' ? (
              <button 
                onClick={() => switchRole('manager')} 
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-lg transition duration-200">
                <LogIn className="w-4 h-4" />
                <span>Masuk Pengelola</span>
              </button>
            ) : (
              <button 
                onClick={() => switchRole('public')}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700">
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Mode</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* BODY CONTENT ROUTER */}
      <main className="flex-1">
        {/* PUBLIC ACCESS VIEWS */}
        {currentRole === 'public' && (
          <>
            {activeTab === 'beranda' && (
              <PublicHomepage 
                stats={stats}
                villages={villages}
                activities={activities}
                events={events}
                monthlyData={monthlyData}
                onSelectVillage={(v) => { setSelectedVillage(v); setActiveTab('profil-detail'); }}
                onNavigate={(tab) => setActiveTab(tab)}
                onSwitchRole={switchRole}
              />
            )}

            {activeTab === 'peta' && (
              <PetaKampungPage 
                villages={villages} 
                onSelectVillage={(v) => { setSelectedVillage(v); setActiveTab('profil-detail'); }}
              />
            )}

            {activeTab === 'daftar' && (
              <DaftarKampungPage 
                villages={villages} 
                onSelectVillage={(v) => { setSelectedVillage(v); setActiveTab('profil-detail'); }}
              />
            )}

            {activeTab === 'kalender' && (
              <KalenderKegiatanPage events={events} activities={activities} />
            )}

            {activeTab === 'kolaborasi' && (
              <KolaborasiPage 
                villages={villages} 
                collaborations={collaborations}
                onAddCollaboration={(newCol) => {
                  setCollaborations([newCol, ...collaborations]);
                  showToast(`Permohonan ${newCol.id} berhasil dikirim! Silakan simpan nomor referensi.`);
                }}
              />
            )}

            {activeTab === 'profil-detail' && selectedVillage && (
              <ProfilKampungDetail 
                village={selectedVillage} 
                activities={activities.filter(a => a.villageId === selectedVillage.id)}
                events={events.filter(e => e.villageId === selectedVillage.id)}
                feedbacks={feedbacks.filter(f => f.villageName === selectedVillage.name)}
                onBack={() => setActiveTab('daftar')}
                onAddFeedback={(fb) => {
                  setFeedbacks([fb, ...feedbacks]);
                  showToast('Umpan balik pengunjung tersimpan & menunggu moderasi.');
                }}
                onOpenCollaboration={() => setActiveTab('kolaborasi')}
              />
            )}
          </>
        )}

        {/* VILLAGE MANAGER ACCESS DASHBOARD */}
        {currentRole === 'manager' && (
          <ManagerDashboard 
            village={villages.find(v => v.id === managerVillageId)}
            activities={activities.filter(a => a.villageId === managerVillageId)}
            events={events.filter(e => e.villageId === managerVillageId)}
            collaborations={collaborations.filter(c => c.targetVillageId === managerVillageId)}
            onSubmitReport={(newReport) => {
              setActivities([newReport, ...activities]);
              showToast('Laporan kegiatan berhasil diunggah! Status: Menunggu Verifikasi');
            }}
            onSubmitEvent={(newEvent) => {
              setEvents([newEvent, ...events]);
              showToast('Agenda kegiatan berhasil diajukan ke Administrator.');
            }}
            onUpdateCollaborationStatus={(id, newStatus) => {
              setCollaborations(collaborations.map(c => c.id === id ? { ...c, status: newStatus } : c));
              showToast(`Status permohonan kolaborasi ${id} diperbarui menjadi: ${newStatus}`);
            }}
            onUpdateVillageProfile={(updatedVillage) => {
              setVillages(villages.map(v => v.id === updatedVillage.id ? updatedVillage : v));
              showToast('Profil profil kampung berhasil diperbarui!');
            }}
          />
        )}

        {/* ADMINISTRATOR ACCESS DASHBOARD */}
        {currentRole === 'admin' && (
          <AdminDashboard 
            stats={stats}
            villages={villages}
            activities={activities}
            collaborations={collaborations}
            monthlyData={monthlyData}
            onApproveReport={(actId) => {
              setActivities(activities.map(a => a.id === actId ? { ...a, status: 'Disetujui' } : a));
              showToast('Laporan kegiatan disetujui & dipublikasikan ke publik!');
            }}
            onRejectReport={(actId) => {
              setActivities(activities.map(a => a.id === actId ? { ...a, status: 'Ditolak' } : a));
              showToast('Laporan kegiatan ditolak.', 'error');
            }}
            onUpdateVillageStatus={(vId, newStatus) => {
              setVillages(villages.map(v => v.id === vId ? { ...v, status: newStatus } : v));
              showToast(`Status keaktifan kampung berhasil diubah menjadi ${newStatus}`);
            }}
            onUpdateAssistance={(vId, assistance) => {
              setVillages(villages.map(v => v.id === vId ? { ...v, assistanceNeeded: assistance } : v));
              showToast('Catatan pendampingan teknis diperbarui.');
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Building2 className="w-5 h-5 text-teal-400" />
              <span>SI-KATAMALANG</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem Informasi Kampung Tematik Kota Malang — Wadah terintegrasi monitoring keaktifan, transparansi pelaporan, dan kolaborasi pembangunan berbasis pemberdayaan masyarakat.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Tautan Pintar</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setActiveTab('peta'); setCurrentRole('public'); }} className="hover:text-teal-400 transition">Peta Sebaran Kampung</button></li>
              <li><button onClick={() => { setActiveTab('daftar'); setCurrentRole('public'); }} className="hover:text-teal-400 transition">Katalog 23 Kampung Tematik</button></li>
              <li><button onClick={() => { setActiveTab('kolaborasi'); setCurrentRole('public'); }} className="hover:text-teal-400 transition">Pengajuan Kolaborasi Eksternal</button></li>
              <li><button onClick={() => { setActiveTab('kalender'); setCurrentRole('public'); }} className="hover:text-teal-400 transition">Agenda & Agenda Budaya</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Status Indikator</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Aktif: Rutin Melapor & Beraktivitas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Pasif: Perlu Pembinaan Tambahan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Dorman: Membutuhkan Intervensi Pemkot</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Kontak Layanan Pemkot</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-teal-400" /> Balai Kota Malang, Jl. Tugu No.1</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-teal-400" /> disporapar@malangkota.go.id</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-teal-400" /> (0341) 362222</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Pemerintah Kota Malang — Prototype Kompetisi Sains & Inovasi Digital.</p>
          <p className="mt-2 sm:mt-0">Dikelola bersama FK2T (Forum Komunikasi Kampung Tematik Malang)</p>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 1. PUBLIC HOMEPAGE COMPONENT
// ==========================================
function PublicHomepage({ stats, villages, activities, events, monthlyData, onSelectVillage, onNavigate, onSwitchRole }) {
  const featuredVillage = useMemo(() => {
    return villages.find(v => v.id === 'kpg-03') || villages[0];
  }, [villages]);

  const pieChartData = [
    { name: 'Aktif', value: stats.active, color: '#22c55e' },
    { name: 'Pasif', value: stats.passive, color: '#f97316' },
    { name: 'Dorman', value: stats.dormant, color: '#ef4444' }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Platform Resmi Revitalisasi Kampung Tematik
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Pantau Keaktifan <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">Kampung Tematik</span> Kota Malang
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Satu pintu informasi kegiatan, status keaktifan, dan agenda kampung tematik yang dilaporkan langsung oleh pengelola kampung dan dapat dipantau masyarakat umum.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate('peta')}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-teal-500/20 transition duration-200 flex items-center gap-2">
              <MapIcon className="w-5 h-5" /> Jelajahi Peta Kampung
            </button>
            <button 
              onClick={() => onNavigate('kolaborasi')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-400" /> Ajukan Kolaborasi
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC STATISTICS CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Kampung</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
              <p className="text-xs text-slate-400 mt-1">Terdaftar resmi di Pemkot</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          {/* Aktif */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 border-l-4 border-l-emerald-500 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Status Aktif</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.active}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">Melapor rutin bulan ini</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          {/* Pasif */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 border-l-4 border-l-amber-500 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Status Pasif</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.passive}</p>
              <p className="text-xs text-amber-600 mt-1 font-medium">Perlu stimulus kegiatan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Dorman */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100 border-l-4 border-l-rose-500 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Status Dorman</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.dormant}</p>
              <p className="text-xs text-rose-600 mt-1 font-medium">Prioritas intervensi Pemkot</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* MAP & QUICK OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-teal-600" /> Peta Kebencanaan & Keaktifan Kampung
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Visualisasi geografis sebaran kampung tematik Kota Malang berdasarkan status laporan aktivitas.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('peta')}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1">
            Buka Peta Mode Layar Penuh <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded Map Component */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200">
          <InteractiveMapWidget 
            villages={villages} 
            onSelectVillage={onSelectVillage} 
          />
        </div>
      </section>

      {/* CHARTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" /> Laporan Kegiatan per Bulan
                </h3>
                <p className="text-xs text-slate-500">Tren pengajuan vs persetujuan laporan kegiatan oleh pengelola kampung</p>
              </div>
              <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium">Tahun 2026</span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="Submitted" name="Dilaporkan" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Approved" name="Disetujui Admin" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-400"></span> Dilaporkan Pengelola
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-teal-600"></span> Disetujui (Terverifikasi)
            </div>
          </div>
        </div>

        {/* Donut Composition Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
              <PieIcon className="w-5 h-5 text-teal-600" /> Komposisi Status Kampung
            </h3>
            <p className="text-xs text-slate-500 mb-4">Persentase keaktifan kampung terdaftar</p>
            
            <div className="h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Kampung</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Aktif</span>
              <span className="font-bold text-slate-900">{stats.active} ({Math.round((stats.active/stats.total)*100)}%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pasif</span>
              <span className="font-bold text-slate-900">{stats.passive} ({Math.round((stats.passive/stats.total)*100)}%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Dorman</span>
              <span className="font-bold text-slate-900">{stats.dormant} ({Math.round((stats.dormant/stats.total)*100)}%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VILLAGE HIGHLIGHT & RECENT ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Kampung */}
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-500/30 font-semibold uppercase tracking-wide">
                Sorotan Kampung Bulan Ini
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-1 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {featuredVillage.rating}
              </span>
            </div>

            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700">
              <img 
                src={featuredVillage.gallery[0]} 
                alt={featuredVillage.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold uppercase">
                  {featuredVillage.status}
                </span>
                <h4 className="text-lg font-bold text-white leading-tight mt-1">{featuredVillage.name}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
              {featuredVillage.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-[10px]">Kegiatan Bulan Ini</p>
                <p className="text-base font-bold text-teal-300 mt-0.5">{featuredVillage.monthlyActivities} Agenda</p>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-[10px]">Pengunjung Bulan Ini</p>
                <p className="text-base font-bold text-emerald-300 mt-0.5">{featuredVillage.visitorsThisMonth} Orang</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSelectVillage(featuredVillage)}
            className="w-full mt-6 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm">
            <span>Lihat Profil Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Activities Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" /> Kegiatan Terverifikasi Terbaru
                </h3>
                <p className="text-xs text-slate-500">Laporan kegiatan kampung yang telah disetujui Administrator</p>
              </div>
              <button onClick={() => onNavigate('kalender')} className="text-xs font-semibold text-teal-700 hover:underline">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">
              {activities.slice(0, 3).map((act) => (
                <div key={act.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start gap-4 hover:border-teal-200 transition">
                  <img src={act.photo} alt={act.title} className="w-full sm:w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold text-[10px]">{act.category}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {act.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                    <p className="text-xs text-teal-700 font-medium">{act.villageName}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-teal-400" />
              <div>
                <p className="text-xs font-bold">Anda Pengelola Kampung?</p>
                <p className="text-[11px] text-slate-400">Laporkan kegiatan rutin untuk pertahankan status aktif.</p>
              </div>
            </div>
            <button 
              onClick={() => onSwitchRole('manager')}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition">
              Lapor Kegiatan
            </button>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS & CALENDAR LINK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <Calendar className="w-6 h-6 text-teal-400" /> Agenda & Festival Mendatang
              </h3>
              <p className="text-xs text-slate-400 mt-1">Jadwal acara kebudayaan dan bazar wisata di kampung tematik</p>
            </div>
            <button 
              onClick={() => onNavigate('kalender')}
              className="bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition">
              Buka Kalender Acara
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold uppercase">{evt.category}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {evt.time}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{evt.title}</h4>
                  <p className="text-xs text-teal-400 font-medium mt-0.5">{evt.villageName}</p>
                </div>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-700/50 flex justify-between items-center">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {evt.date}</span>
                  <span className="truncate max-w-[120px]">{evt.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// INTERACTIVE MAP WIDGET / PAGE
// ==========================================
function InteractiveMapWidget({ villages, onSelectVillage }) {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedPin, setSelectedPin] = useState(null);

  const filtered = useMemo(() => {
    if (filterStatus === 'Semua') return villages;
    return villages.filter(v => v.status === filterStatus);
  }, [villages, filterStatus]);

  return (
    <div className="space-y-4">
      {/* Map Control Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Filter Status Map:</span>
          {['Semua', 'Aktif', 'Pasif', 'Dorman'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterStatus === st 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Aktif ({villages.filter(v=>v.status==='Aktif').length})</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Pasif ({villages.filter(v=>v.status==='Pasif').length})</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Dorman ({villages.filter(v=>v.status==='Dorman').length})</div>
        </div>
      </div>

      {/* Interactive Canvas/SVG Custom Leaflet Simulation */}
      <div className="relative w-full h-[420px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Map Grid Gridlines Simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        
        {/* River visual SVG line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <path d="M 50,0 Q 200,200 400,180 T 800,420" stroke="#0ea5e9" strokeWidth="14" fill="none" />
        </svg>

        {/* Map Pins */}
        <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around">
          {filtered.map((v, i) => {
            // Simulated position distribution
            const top = `${(Math.abs(v.lat) * 100000) % 70 + 15}%`;
            const left = `${(Math.abs(v.lng) * 100000) % 80 + 10}%`;

            const pinColor = v.status === 'Aktif' ? 'bg-emerald-500 ring-emerald-300' : v.status === 'Pasif' ? 'bg-amber-500 ring-amber-300' : 'bg-rose-500 ring-rose-300';

            return (
              <div 
                key={v.id} 
                style={{ position: 'absolute', top, left }}
                className="group cursor-pointer z-10 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 hover:scale-125"
                onClick={() => setSelectedPin(v)}
              >
                <div className={`w-6 h-6 rounded-full ${pinColor} ring-4 ring-opacity-40 shadow-lg flex items-center justify-center text-slate-950 font-black text-[10px]`}>
                  {i + 1}
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none transition shadow-lg border border-slate-700">
                  {v.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Village Preview Popup Modal */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 z-30 space-y-3 animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                  selectedPin.status === 'Aktif' ? 'bg-emerald-600' : selectedPin.status === 'Pasif' ? 'bg-amber-600' : 'bg-rose-600'
                }`}>
                  {selectedPin.status}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{selectedPin.name}</h4>
                <p className="text-xs text-slate-500">{selectedPin.category}</p>
              </div>
              <button onClick={() => setSelectedPin(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">{selectedPin.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">{selectedPin.monthlyActivities} Kegiatan Bulan Ini</span>
              <button 
                onClick={() => onSelectVillage(selectedPin)}
                className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1">
                Buka Profil <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-400 px-3 py-1.5 rounded-lg text-[10px] border border-slate-800">
          *Lokasi titik marker merupakan ilustrasi titik kampung tematik Kota Malang
        </div>
      </div>
    </div>
  );
}

function PetaKampungPage({ villages, onSelectVillage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MapIcon className="w-6 h-6 text-teal-600" /> Peta Interaktif Kampung Tematik
        </h1>
        <p className="text-sm text-slate-500 mt-1">Eksplorasi lokasi dan status keaktifan 23 kampung tematik Kota Malang.</p>
      </div>

      <InteractiveMapWidget villages={villages} onSelectVillage={onSelectVillage} />
    </div>
  );
}

// ==========================================
// 2. DAFTAR KAMPUNG PAGE (SEARCHABLE DIRECTORY)
// ==========================================
function DaftarKampungPage({ villages, onSelectVillage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  const categories = useMemo(() => {
    const set = new Set(villages.map(v => v.category));
    return ['Semua', ...Array.from(set)];
  }, [villages]);

  const filteredVillages = useMemo(() => {
    return villages.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'Semua' || v.status === statusFilter;
      const matchCategory = categoryFilter === 'Semua' || v.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [villages, searchTerm, statusFilter, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daftar Kampung Tematik Kota Malang</h1>
        <p className="text-sm text-slate-500 mt-1">Direktori terintegrasi 23 kampung tematik terdaftar resmi.</p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama kampung, daya tarik, atau potensi..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Status:</span>
            {['Semua', 'Aktif', 'Pasif', 'Dorman'].map(st => (
              <button 
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  statusFilter === st ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                {st}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Kategori:</span>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-teal-500">
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VILLAGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVillages.map(village => (
          <div 
            key={village.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-between hover:shadow-xl transition group">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={village.gallery[0] || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'} 
                  alt={village.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow ${
                    village.status === 'Aktif' ? 'bg-emerald-600' : village.status === 'Pasif' ? 'bg-amber-600' : 'bg-rose-600'
                  }`}>
                    {village.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-white font-medium">
                  {village.category}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">{village.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{village.description}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{village.address}</span>
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">{village.monthlyActivities} Laporan Kegiatan</span>
              <button 
                onClick={() => onSelectVillage(village)}
                className="bg-slate-900 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-1">
                <span>Profil</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. PROFIL KAMPUNG DETAIL PAGE
// ==========================================
function ProfilKampungDetail({ village, activities, events, feedbacks, onBack, onAddFeedback, onOpenCollaboration }) {
  const [activeTab, setActiveTab] = useState('ikhtisar');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddFeedback({
      id: `fb-${Date.now()}`,
      villageName: village.name,
      rating: ratingInput,
      comment: commentInput,
      date: new Date().toISOString().split('T')[0]
    });
    setCommentInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm w-fit">
        ← Kembali ke Daftar Kampung
      </button>

      {/* VILLAGE HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                village.status === 'Aktif' ? 'bg-emerald-500 text-slate-950' : village.status === 'Pasif' ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-white'
              }`}>
                Status: {village.status}
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700">
                {village.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{village.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" /> {village.address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={onOpenCollaboration}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Ajukan Kolaborasi
            </button>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <QrCode className="w-10 h-10 text-teal-400" />
              <div className="text-[11px]">
                <p className="font-bold text-white">QR Profil Publik</p>
                <p className="text-slate-400">Pindai untuk berbagi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {village.gallery.map((img, idx) => (
          <div key={idx} className="h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img src={img} alt={`${village.name} ${idx+1}`} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
          </div>
        ))}
      </div>

      {/* DETAIL TABS CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Info Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Deskripsi & Sejarah</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{village.description}</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Sejarah Singkat</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{village.history}</p>
            </div>
          </div>

          {/* Attractions */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Daya Tarik & Potensi Unggulan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {village.attractions.map((att, i) => (
                <div key={i} className="flex items-center gap-2 bg-teal-50 p-3 rounded-xl border border-teal-100 text-xs font-semibold text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{att}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities History */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Kegiatan Terverifikasi Kampung</h3>
            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada laporan kegiatan terverifikasi bulan ini.</p>
            ) : (
              <div className="space-y-3">
                {activities.map(act => (
                  <div key={act.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-slate-400">{act.date}</span>
                    </div>
                    <p className="text-xs text-slate-600">{act.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Informasi Pengelola</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p><span className="font-bold">Ketua Pengelola:</span> {village.managerName}</p>
              <p><span className="font-bold">Kontak Layanan:</span> {village.managerContact}</p>
              <p><span className="font-bold">Kebutuhan Pendampingan:</span> {village.assistanceNeeded}</p>
            </div>
          </div>

          {/* Visitor Feedback */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Umpan Balik Pengunjung</h3>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Beri Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRatingInput(num)}
                      className="p-1"
                    >
                      <Star className={`w-5 h-5 ${num <= ratingInput ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <textarea 
                  rows="2" 
                  placeholder="Tulis ulasan Anda tentang kampung ini..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs transition">
                Kirim Umpan Balik
              </button>
            </form>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              {feedbacks.map(fb => (
                <div key={fb.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="flex text-amber-400">{'★'.repeat(fb.rating)}</span>
                    <span className="text-[10px] text-slate-400">{fb.date}</span>
                  </div>
                  <p className="text-slate-700">{fb.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. KALENDER KEGIATAN PAGE
// ==========================================
function KalenderKegiatanPage({ events, activities }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kalender Kegiatan & Agenda Kampung</h1>
        <p className="text-sm text-slate-500 mt-1">Jadwal event kebudayaan, pelatihan, dan bazar UMKM terkonfirmasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(evt => (
          <div key={evt.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-bold">{evt.category}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {evt.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
              <p className="text-xs font-semibold text-teal-700">{evt.villageName}</p>
              <p className="text-xs text-slate-600">{evt.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {evt.time}</span>
              <span className="font-medium text-slate-700">{evt.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. JELAJAHI POTENSI & KOLABORASI PAGE + FORM
// ==========================================
function KolaborasiPage({ villages, collaborations, onAddCollaboration }) {
  const [showModal, setShowModal] = useState(false);
  const [trackRef, setTrackRef] = useState('');
  const [trackedResult, setTrackedResult] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    organization: '',
    email: '',
    phone: '',
    applicantType: 'Akademisi / Peneliti',
    targetVillageId: villages[0]?.id || '',
    purpose: '',
    activityForm: '',
    collaborationCategory: 'Budaya & Kesenian',
    plannedDate: '',
    estimatedParticipants: 20,
    additionalNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetV = villages.find(v => v.id === formData.targetVillageId);
    const newRef = `KOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCol = {
      ...formData,
      id: newRef,
      targetVillageName: targetV?.name || 'Kampung Tematik',
      status: 'Menunggu Pengelola',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    onAddCollaboration(newCol);
    setShowModal(false);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const found = collaborations.find(c => c.id.toUpperCase() === trackRef.trim().toUpperCase());
    setTrackedResult(found || 'NOT_FOUND');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full font-bold border border-teal-500/30 uppercase">
            Fitur Unggulan SI-KATAMALANG
          </span>
          <h1 className="text-3xl font-black">Jelajahi Potensi & Ajukan Kolaborasi</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Hubungkan riset mahasiswa, pengabdian dosen, event komunitas, dan sponsorship CSR dengan 23 kampung tematik Kota Malang.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition text-sm flex items-center gap-2">
          <Plus className="w-5 h-5" /> Form Permohonan Kolaborasi
        </button>
      </div>

      {/* TRACKING PROGRESS TOOL */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-teal-600" /> Cek Status Permohonan Kolaborasi Anda
        </h3>
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Masukkan Nomor Referensi (contoh: KOL-2026-8812)" 
            value={trackRef}
            onChange={(e) => setTrackRef(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm">
            Cek Progress
          </button>
        </form>

        {trackedResult && trackedResult !== 'NOT_FOUND' && (
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 text-xs space-y-2">
            <div className="flex justify-between font-bold">
              <span>{trackedResult.id} - {trackedResult.organization}</span>
              <span className="bg-teal-700 text-white px-2 py-0.5 rounded">{trackedResult.status}</span>
            </div>
            <p><span className="font-semibold">Kampung Dituju:</span> {trackedResult.targetVillageName}</p>
            <p><span className="font-semibold">Tujuan:</span> {trackedResult.purpose}</p>
          </div>
        )}

        {trackedResult === 'NOT_FOUND' && (
          <p className="text-xs text-rose-600 font-semibold">Nomor referensi tidak ditemukan. Periksa kembali format nomor referensi Anda.</p>
        )}
      </div>

      {/* POTENTIAL CATEGORIES */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Kategori Potensi Kampung</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { cat: 'Budaya & Kesenian', desc: 'Seni tari topeng, kriya payung kertas, dan musik tradisional.' },
            { cat: 'Pendidikan & Riset', desc: 'Objek studi lingkungan, perikanan, sejarah kolonial, dan sosial.' },
            { cat: 'UMKM & Ekonomi Kreatif', desc: 'Sentra olahan tempe, keramik porselen, dan lampion hias.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">{item.cat}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMISSION FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Formulir Permohonan Kolaborasi</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Pemohon *</label>
                  <input required type="text" value={formData.applicantName} onChange={e=>setFormData({...formData, applicantName: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Instansi / Organisasi *</label>
                  <input required type="text" value={formData.organization} onChange={e=>setFormData({...formData, organization: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email *</label>
                  <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor Kontak WhatsApp *</label>
                  <input required type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kampung Tematik Dituju *</label>
                  <select value={formData.targetVillageId} onChange={e=>setFormData({...formData, targetVillageId: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300">
                    {villages.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori Kolaborasi</label>
                  <select value={formData.collaborationCategory} onChange={e=>setFormData({...formData, collaborationCategory: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300">
                    <option>Budaya & Kesenian</option>
                    <option>Pendidikan & Riset</option>
                    <option>UMKM & Ekonomi Kreatif</option>
                    <option>Lingkungan & Ekowisata</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tujuan Kolaborasi *</label>
                <input required type="text" placeholder="Misal: Riset Skripsi / Event Pameran / Pengabdian" value={formData.purpose} onChange={e=>setFormData({...formData, purpose: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi & Bentuk Kegiatan *</label>
                <textarea required rows="3" value={formData.additionalNotes} onChange={e=>setFormData({...formData, additionalNotes: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" placeholder="Jelaskan secara singkat rencana dan manfaat bagi kampung..." />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold">
                  Batal
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-lg">
                  Kirim Permohonan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. VILLAGE MANAGER DASHBOARD
// ==========================================
function ManagerDashboard({ village, activities, events, collaborations, onSubmitReport, onSubmitEvent, onUpdateCollaborationStatus, onUpdateVillageProfile }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportForm, setShowReportForm] = useState(false);

  // New Report Form state
  const [reportForm, setReportForm] = useState({
    title: '',
    category: 'Pelatihan UMKM',
    date: new Date().toISOString().split('T')[0],
    description: '',
    participants: 10,
    visitors: 50,
    photo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  });

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const newAct = {
      ...reportForm,
      id: `act-${Date.now()}`,
      villageId: village.id,
      villageName: village.name,
      status: 'Menunggu Verifikasi'
    };
    onSubmitReport(newAct);
    setShowReportForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* MANAGER HEADER BAR */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30 font-bold uppercase">
            Dashboard Pengelola Kampung
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">{village?.name}</h1>
          <p className="text-xs text-slate-400 mt-1">Status Keaktifan: <span className="text-emerald-400 font-bold">{village?.status}</span></p>
        </div>

        <button 
          onClick={() => setShowReportForm(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition text-sm flex items-center gap-2">
          <Plus className="w-5 h-5" /> Lapor Kegiatan Baru
        </button>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-slate-500 font-bold uppercase">Total Laporan</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{activities.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-emerald-600 font-bold uppercase">Terverifikasi</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{activities.filter(a => a.status === 'Disetujui').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-amber-600 font-bold uppercase">Menunggu Admin</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{activities.filter(a => a.status === 'Menunggu Verifikasi').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-indigo-600 font-bold uppercase">Permohonan Kolaborasi</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">{collaborations.length}</p>
        </div>
      </div>

      {/* REPORT HISTORY TABLE */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Riwayat Laporan Kegiatan Kampung</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3">Judul Kegiatan</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Peserta</th>
                <th className="p-3">Status Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.map(act => (
                <tr key={act.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{act.title}</td>
                  <td className="p-3">{act.category}</td>
                  <td className="p-3 text-slate-500">{act.date}</td>
                  <td className="p-3">{act.participants} orang</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      act.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COLLABORATIONS INBOX */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Permohonan Kolaborasi Masuk</h3>
        {collaborations.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada permohonan kolaborasi eksternal masuk.</p>
        ) : (
          <div className="space-y-4">
            {collaborations.map(col => (
              <div key={col.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{col.id}</span>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">{col.applicantType}</span>
                  </div>
                  <p className="font-semibold text-slate-800">{col.organization} ({col.applicantName})</p>
                  <p className="text-slate-600"><span className="font-bold">Tujuan:</span> {col.purpose}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onUpdateCollaborationStatus(col.id, 'Disetujui Pengelola')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg">
                    Terima
                  </button>
                  <button 
                    onClick={() => onUpdateCollaborationStatus(col.id, 'Ditolak Pengelola')}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg">
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REPORT FORM MODAL */}
      {showReportForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Form Lapor Kegiatan Kampung</h3>
            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Kegiatan *</label>
                <input required type="text" value={reportForm.title} onChange={e=>setReportForm({...reportForm, title: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori *</label>
                  <select value={reportForm.category} onChange={e=>setReportForm({...reportForm, category: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300">
                    <option>Pelatihan UMKM</option>
                    <option>Festival Budaya</option>
                    <option>Lingkungan</option>
                    <option>Kerja Bakti</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Pelaksanaan *</label>
                  <input required type="date" value={reportForm.date} onChange={e=>setReportForm({...reportForm, date: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Ringkas Kegiatan *</label>
                <textarea required rows="3" value={reportForm.description} onChange={e=>setReportForm({...reportForm, description: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowReportForm(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold">Kirim Laporan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. ADMINISTRATOR DASHBOARD
// ==========================================
function AdminDashboard({ stats, villages, activities, collaborations, monthlyData, onApproveReport, onRejectReport, onUpdateVillageStatus, onUpdateAssistance }) {
  const pendingReports = useMemo(() => activities.filter(a => a.status === 'Menunggu Verifikasi'), [activities]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ADMIN HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30 font-bold uppercase">
          Portal Administrator Pemkot Malang
        </span>
        <h1 className="text-2xl sm:text-3xl font-black mt-2">Pusat Pengawasan & Verifikasi SI-KATAMALANG</h1>
        <p className="text-xs text-slate-300 mt-1">Sistem Evaluasi Terpadu Bappeda & Disporapar Kota Malang</p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-slate-500 font-bold uppercase">Total Kampung</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-amber-600 font-bold uppercase">Laporan Perlu Verifikasi</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{pendingReports.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-rose-600 font-bold uppercase">Kampung Dorman</p>
          <p className="text-2xl font-black text-rose-600 mt-1">{stats.dormant}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200">
          <p className="text-indigo-600 font-bold uppercase">Total Permohonan Kolaborasi</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">{collaborations.length}</p>
        </div>
      </div>

      {/* REPORT VERIFICATION SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Verifikasi Laporan Masuk
        </h3>

        {pendingReports.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Tidak ada laporan kegiatan yang menunggu verifikasi saat ini.</p>
        ) : (
          <div className="space-y-4">
            {pendingReports.map(act => (
              <div key={act.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{act.title}</span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">{act.category}</span>
                  </div>
                  <p className="text-slate-600 font-medium">{act.villageName} • {act.date}</p>
                  <p className="text-slate-500">{act.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onApproveReport(act.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl">
                    Disetujui
                  </button>
                  <button 
                    onClick={() => onRejectReport(act.id)}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl">
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VILLAGES MONITORING & ASSISTANCE MODULE */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Monitoring Keaktifan & Evaluasi Status Kampung</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3">Nama Kampung</th>
                <th className="p-3">Status Saat Ini</th>
                <th className="p-3">Laporan Bulan Ini</th>
                <th className="p-3">Kebutuhan Pendampingan</th>
                <th className="p-3">Ubah Status Keaktifan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {villages.map(v => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{v.name}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      v.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : v.status === 'Pasif' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">{v.monthlyActivities} laporan</td>
                  <td className="p-3 text-slate-500 max-w-xs truncate">{v.assistanceNeeded}</td>
                  <td className="p-3">
                    <select 
                      value={v.status}
                      onChange={(e) => onUpdateVillageStatus(v.id, e.target.value)}
                      className="p-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-indigo-500">
                      <option value="Aktif">Aktif</option>
                      <option value="Pasif">Pasif</option>
                      <option value="Dorman">Dorman</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}