<?php
require("./components/head-serverside-code.php")
?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>USAFB Web Template</title>
  <meta name="description" content="USAFB Web Template">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php
  require("./components/head.php")
?>
    <style>
      /* .flex-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
    } */

      .flex-container {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row wrap;
        flex-flow: row wrap;
      }

      .flex-item:nth-child(1) {
        order: 0;
        -webkit-flex: 1 0 100%;
        flex: 1 0 100%;
      }

      .flex-item:nth-child(2) {
        order: 0;
        flex: 0 1 100%;
        align-self: auto;
      }

      .flex-item:nth-child(3) {
        order: 0;
        flex: 0 1 100%;
        align-self: auto;
      }

    </style>
    <style>
      .header-container {
        background: #09254a;
        color: #8AB8E4;
        height: 90px;
        height: 5.625rem;
      }

      .page-title-container {
        padding-left: 30px;
      }

      .page-title-container .page-title {
        color: #09254a;
        font-size: 1.25rem;
        font-weight: bold;
        text-transform: uppercase;
      }

      .action-items {
        padding-right: 30px;
      }

      .alert-dismissible .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: .75rem 1.25rem;
        color: inherit;
      }

      .alert {
        position: relative;
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: .25rem;
      }

      button.close {
        padding: 0;
        background: 0 0;
        border: 0;
        -webkit-appearance: none;
      }

    </style>
</head>

<body>
  <div class="flex-container fixed-top">
    <?php
      require("./components/header-nav.php")
    ?>
      <!-- main content -->
      <main id="main-content" class="container-fluid d-flex">
        <div class="row flex-item">
          <section class="col-4 page-title-container">
            <h1 class="page-title offset-top-10">
              <i class="fa fa-user text-xlg offset-top--6 mr-2" aria-hidden="true"></i>This is the Page Title Section</h1>
          </section>
          <section class="col-4 alertPane">
            <!-- message from interactions with the users grid -->
            <div id="mbx" class="alert alert-success alert-dismissible fade show" role="alert">
              <button type="button" id="alert-close" class="close" data-dismiss="alert" aria-label="Close">
                <span>&times;</span>
              </button>
              <i class="fa fa-check-circle text-xlg align-middle" aria-hidden="true"></i>
              <label id="mbxLbl" class="mt-2"> This is the alert section</label>
            </div>
            <!-- /message from interactions with the users grid -->
          </section>
          <section class="col-4 action-items text-center">
            <button class="btn btn-primary text-lg mr-1" type="button">
              <i class="fa fa-cloud text-xlg align-middle" aria-hidden="true"></i> action items section
            </button>
          </section>
          <!-- message from interactions with the users grid -->
        </div>
        <section class="row">
          <div class="col-12 text-center mb-1" style="background: #ddd; height: 300px">
            MAIN CONTENT
          </div>
        </section>

      </main>
      <?php
      require("./components/footer.php");
      require("./components/footer-js.php")
    ?>


</body>

</html>
