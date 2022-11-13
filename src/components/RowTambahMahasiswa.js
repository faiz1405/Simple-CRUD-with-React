import React, { useState } from "react";

const RowTambahMahasiswa = (props) => {
  // state untuk data inputan form
  const [formInput, setFormInput] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  // function untuk memeriksa apakah ada nim yang sama atau tidak
  const cekDuplikasiNim = () => {
    return props.mahasiswas.find(
      (mahasiswa) => mahasiswa.nim === formInput.nim
    );
  };

  // state untuk menampung pesan error
  const [errors, setErrors] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  // funstion untuk membuat 2 ways binding anatra form dengan state
  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let pesanErrors = {};

    // Validasi nim
    if (formInput.nim.trim() === "") {
      pesanErrors.nim = "NIM tidak boleh kosong";
    } else if (!/^[0-9]{8}$/.test(formInput.nim)) {
      pesanErrors.nim = "NIM harus 8 karakter";
    } else if (cekDuplikasiNim()) {
      pesanErrors.nim = "NIM sudah terpakai";
    } else {
      pesanErrors.nim = "";
    }

    // Validasi nama
    if (formInput.nama.trim() === "") {
      pesanErrors.nama = "Nama tidak boleh kosong";
    } else {
      pesanErrors.nama = "";
    }

    // Validasi jurusan
    if (formInput.jurusan.trim() === "") {
      pesanErrors.jurusan = "Jurusan tidak boleh kosong";
    } else {
      pesanErrors.jurusan = "";
    }

    // Validasi Asal Provinsi
    if (formInput.asalProvinsi.trim() === "") {
      pesanErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong";
    } else {
      pesanErrors.asalProvinsi = "";
    }

    // Update error state
    setErrors(pesanErrors);

    // cek apakah seluruh form valid atau masih ada error
    let formValid = true;
    for (let inputName in pesanErrors) {
      if (pesanErrors[inputName].length > 0) {
        formValid = false;
      }
    }

    // proses data jika form valid
    if (formValid) {
      props.onTambahMahasiswa(formInput);
    }

    // kosongkan inputan formI
    setFormInput({
      nim: "",
      nama: "",
      jurusan: "",
      asalProvinsi: "",
    });
  };
  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row row-cols-5 g-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nim"
                placeholder="00000000"
                onChange={handleInputChange}
                value={formInput.nim}
              />
              {errors.nim && <small>{errors.nim}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Fulan Fulana"
                onChange={handleInputChange}
                value={formInput.nama}
              />
              {errors.nama && <small>{errors.nama}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="jurusan"
                placeholder="Sistem Informasi"
                onChange={handleInputChange}
                value={formInput.jurusan}
              />
              {errors.jurusan && <small>{errors.jurusan}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="asalProvinsi"
                placeholder="DKI Jakarta"
                onChange={handleInputChange}
                value={formInput.asalProvinsi}
              />
              {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default RowTambahMahasiswa;
