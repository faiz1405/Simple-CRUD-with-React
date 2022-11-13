import React, { useState } from "react";

const RowMahasiswa = (props) => {
  // simpan props mahasiswa ke dalam state agar muda diakses
  const [formInput, setFormInput] = useState({
    nim: props.mahasiswa.nim,
    nama: props.mahasiswa.nama,
    jurusan: props.mahasiswa.jurusan,
    asalProvinsi: props.mahasiswa.asalProvinsi,
  });

  // state untuk menampung pesan errors
  const [errors, setErrors] = useState({
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  // state untuk menampung nilai form sebelum "edit mode"
  const [dataReset, setDataReset] = useState({});

  // state untuk penanda "Edit Mode"
  const [editStatus, setEditStatus] = useState(false);

  const handleFormReset = (event) => {
    event.preventDefault();

    // kembalikan isis form posisi sebelum tombol edit di klik
    setFormInput({ ...dataReset });

    // hapus pesan error
    setErrors({});

    // keluar dari edit mode se
    setEditStatus(false);
  };

  // function untuk membuat 2 ways binding antara form dengan state
  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // tombol edit di kilk
  const handleEditClick = () => {
    // simpan data untuk proses reset
    setDataReset({ ...formInput });

    // masuk ke edit mode
    setEditStatus(true);
  };

  // tombol di submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEditStatus(false);
    let pesanErrors = {};

    // va;idasi nama
    if (formInput.nama.trim() === "") {
      pesanErrors.nama = "Nama tidak boleh kosong";
    } else {
      pesanErrors.nama = "";
    }

    // validasi jurusan
    if (formInput.jurusan.trim() === "") {
      pesanErrors.jurusan = "Jurusan tidak boleh kosong";
    } else {
      pesanErrors.jurusan = "";
    }

    // validasi asla provinsi
    if (formInput.asalProvinsi.trim() === "") {
      pesanErrors.asalProvinsi = "Asal provinsi tidak boleh kosong";
    } else {
      pesanErrors.asalProvinsi = "";
    }

    // update error state
    setErrors(pesanErrors);

    // cek apakah seluruh form valid atau masih ada errors
    let formValid = true;
    for (let propName in pesanErrors) {
      if (pesanErrors[propName].length > 0) {
        formValid = false;
        setEditStatus(true);
      }
    }

    // proses data jika sudah valid
    if (formValid) {
      setEditStatus(false);
      props.onEditMahasiswa(formInput);
    }
  };

  return (
    <React.Fragment>
      {/* Tampilan form jika tombol edit di klik, atau tampilkan row normal */}

      {editStatus ? (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
              <div className="row row-cols-5 g-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    defaultValue={formInput.nim}
                    name="nama"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
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
                    onChange={handleInputChange}
                    value={formInput.asalProvinsi}
                  />
                  {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
                </div>
                <div className="col">
                  <button className="btn btn-success me-2" type="submit">
                    Simpan
                  </button>
                  <button className="btn btn-warning" type="reset">
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{formInput.nim}</td>
          <td>{formInput.nama}</td>
          <td>{formInput.jurusan}</td>
          <td>{formInput.asalProvinsi}</td>
          <td>
            <button
              className="btn btn-secondary me-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              id={formInput.nim}
              onClick={props.onHapusMahasiswa}
            >
              Hapus
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default RowMahasiswa;
