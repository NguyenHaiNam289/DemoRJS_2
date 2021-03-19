import './App.css';
//import GUI_info from './components/GUI_info';
//import ReactDOM from 'react-dom';

//import { Component } from 'react';

function App(){
    let IP = "3.0.19.196";
    let PORT = "9191";
    let urlUser = `http://${IP}:${PORT}/api/user/login`;
    let urlInfo = `http://${IP}:${PORT}/api/user/getInfoUser`;
    let urlHP = `http://${IP}:${PORT}/api/dkhp/getDanhSachLopHocPhanCoTrongHocPhan?maHocPhan=1&maHocKi=1`;
    let accessToken;
    
            
    const sendHttpRequest = (method, url, data, accessToken) => {
        if (data === null || data === "") {
            return fetch(url, {
                method: method,
                headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
                },
            })
            .then((res) => {
                return res.text().then((text) => (text ? JSON.parse(text) : {}));
            })
            .catch((error) => console.log("ERROR!", error));
        } else {
            return fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.text().then((text) => (text ? JSON.parse(text) : {}));
            })
            .catch((error) => console.log("ERROR!", error));
        }
    };

    const login = () => {
        // console.log(urlUser);
        var id = document.querySelector('input[name="mssv"]').value;
        var pass = document.querySelector('input[name="pass"]').value;
        document.getElementById('Info').innerHTML = "";
        document.getElementById('thongbao').innerHTML = "";
        sendHttpRequest("POST", urlUser, {
            mssv: id,
            password: pass,
        }).then((responseData) => {
            if (responseData != null) {
            accessToken = responseData.data.accessToken;
            document.querySelector('input[name="pass"]').value = "";
            alert("Đăng nhập thành công");
            }
        })
        .catch(() => loginError());
    };

    const getInfoUser = () => {
    sendHttpRequest("GET", urlInfo, "", accessToken).then((responseData) =>
        Gui_info(responseData.data)
    ).catch((responseData) => infoError(responseData));

    };

    const getHocPhan = () => {
    sendHttpRequest("GET", urlHP).then((responseData) =>
        console.log(responseData)
    );
    };


    var pm = new Promise(
        function(resolve, reject){
            resolve("thành công");
            reject("co lỗi");
        }
    );
    pm
        .then(function(courses){
            console.log(courses);
        })
        .catch(function(error){
            console.log(error);
        })


    function loginError() {
        document.getElementById('thongbao').innerHTML = 'SAI MSSV hoặc Mặt Khẩu';    
    }
    function infoError(err) {
        console.log(err)
        document.getElementById('Info').innerHTML = 'Bạn chưa Đăng nhập hoặc đã Đăng Nhập quá lâu';    
    }

    
    function Gui_info(data) {
        var hoten = data.hoTen;
        var mssv = data.mssv;
        var chuyenNganh = data.chuyenNganh;
        var bacDaoTao = data.bacDaoTao;
        var khoaHoc = data.khoaHoc;
        var loaiHinhDaoTao = data.loaiHinhDaoTao;
        var trangThaiHocTap = data.trangThaiHocTap;
        var soCMND = data.soCMND;
        var soDienThoai = data.soDienThoai;
        var email = data.email;
        var diaChiLienHe = data.diaChiLienHe;
        var hoKhauThuongTru = data.hoKhauThuongTru;

        document.getElementById('Info').innerHTML = "";
        var html =  `
            <table>
            <tr><td colSpan="4" border= "1px"><h4>Thông Tin Chi tiết</h4></td></tr>
            <tr>
                <td>HỌ TÊN</td>
                <td>${hoten}</td>
                <td>MSSV</td>
                <td>${mssv}</td>
            </tr>
            <tr>
                <td>Chuyên Nghành</td>
                <td>${chuyenNganh}</td>
                <td>Bậc Đào tạo</td>
                <td>${bacDaoTao}</td>
            </tr>
            <tr>
                <td>Loại Hình Đào Tạo</td>
                <td>${loaiHinhDaoTao}</td>
                <td>Khóa Học</td>
                <td>${khoaHoc}</td>
            </tr>
            <tr>
                <td>Trạng thái HT</td>
                <td>${trangThaiHocTap}</td>
                <td>Số CMND</td>
                <td>${soCMND}</td>
            </tr>
            <tr>
                <td>Số Điện Thoại</td>
                <td>${soDienThoai}</td>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Địa Chỉ</td>
                <td>${diaChiLienHe}</td>
                <td>Hộ Khẩu Thường Trú</td>
                <td>${hoKhauThuongTru}</td>
            </tr>
            
            </table>            `
        document.getElementById('Info').innerHTML = html;
        //ReactDOM.render( <GUI_info hoten = t/>, document.getElementById('Info'));     
    }
    
    return(
        <div>
            <div className="content">
                <div className="left login">
                    <input type="text" name="mssv" id="mssv" placeholder="Nhập mã sinh viên"/>
                    <input type="password" name="pass" placeholder="Nhập mật khẩu"/>
                    <button type="button" className="btn btn-outline-warning" onClick={login}>Đăng nhập</button>
                    <div id="thongbao"></div>
                </div>
                <div className="center getInfo">
                    <button type="button" className="infor" onClick={getInfoUser} id = 'information'  className="btn btn-outline-warning">Thông tin sinh viên</button>
                    <div id="Info"></div>
                </div>
                <div className="right getHP">
                            <button type="button" onClick={getHocPhan} className="hoc-phan" id="hocphan" className="btn btn-outline-warning">Học phần</button>
                </div>
            </div>
        </div>
    );
  
  
}

export default App;
