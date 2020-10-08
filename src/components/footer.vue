<template>
  <div>
    <footer>
      <div class="footer">
        <div class="container">
          <div class="footer-item">
            <h4>貓咪食品</h4>
            <nav>
              <a href="#"><i class="fas fa-angle-right"></i>主食罐</a>
              <a href="#"><i class="fas fa-angle-right"></i>副食罐</a>
              <a href="#"><i class="fas fa-angle-right"></i>乾飼料</a>
              <a href="#"><i class="fas fa-angle-right"></i>肉泥 / 肉條</a>
            </nav>
          </div>
          <div class="footer-item">
            <h4>貓咪用品</h4>
            <nav>
              <a href="#"><i class="fas fa-angle-right"></i>貓砂鏟</a>
              <a href="#"><i class="fas fa-angle-right"></i>胸背帶</a>
              <a href="#"><i class="fas fa-angle-right"></i>剃毛刀</a>
              <a href="#"><i class="fas fa-angle-right"></i>逗貓棒</a>
              <a href="#"><i class="fas fa-angle-right"></i>貓草</a>
            </nav>
          </div>
          <div class="footer-item">
            <h4>貓咪廁所</h4>
            <nav>
              <a href="#"><i class="fas fa-angle-right"></i>礦砂</a>
              <a href="#"><i class="fas fa-angle-right"></i>豆腐砂</a>
              <a href="#"><i class="fas fa-angle-right"></i>松木砂</a>
              <a href="#"><i class="fas fa-angle-right"></i>木屑砂</a>
            </nav>
          </div>
          <div class="footer-item">
            <h4>聯絡方式</h4>
            <nav>
              <p><i class="fas fa-phone"></i>電話：03-1234567</p>
              <p><i class="fas fa-map-marker-alt"></i>地址：新竹市東區光復路二段123巷18號5樓</p>
              <p><i class="far fa-envelope-open"></i>客服信箱：abdhsk123@gmail.com</p>
            </nav>
          </div>
        </div>
      </div>

      <div class="copyright">
        Copyright &copy; 2020 關於貓咪的賣場
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
footer{
  .footer{
    background-color: #123;
    .container{
      display: flex;
      justify-content: space-around;
      padding: 50px 0;
      .footer-item{
        color: #fff;
        h4{
          border-bottom: 2px dotted #fff;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        nav{
          display: flex;
          flex-direction: column;
          align-items: start;
          a, p{
            color: #fff;
            text-decoration: none;
            i{
              margin-right: 10px;
            }
          }
          a:hover{
            color: #aaa;
          }
        }
      }
    }
  }
  .copyright{
    background-color: rgb(66, 66, 83);
    color: #fff;
    font-size: 0.8rem;
    padding: 5px 0;
  }
}
</style>
