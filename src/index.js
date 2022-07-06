import './scss/custom.scss'
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import "./css/style.css"
import "./css/style.css"
import 'bootstrap';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';



$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $(".add-to-cart-btn").click(function(){
        alert('أضيف المنتج الى سلة الشراء');
    });
    
    $('#copyright').text("جميع الحقوق محفوظة سنة" + new Date().getFullYear() );

    $(".product-option input[type='radio']").change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    // عندما تتغير كمية المنتج 
    $("[data-product-quantity]").change(function() {
        
        // جلب الكمية الجديدة
        var newQuantity = $(this).val();

        // البحث عن السطر الذي يحتوي على معلومات المنتج
        var parent = $(this).parents("[data-product-info]");

        // جلب سعر القطقة الواحدة من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');

        // السعر الاجمالي 
        var totalPriceForProduct = newQuantity * pricePerUnit;

        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // حدث السعر الإجمالي لكل المُنتجات
        calculateTotalPrice();

    });
    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
      
        // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
        var totalPriceForAllProducts = 0;
    
        // لكل سطر يمثل معلومات المُنتج في الصّفحة
        $('[data-product-info]').each(function() {
    
            // اجلب سعر القطعة الواحدة من الخاصّية الموافقة
            var pricePerUnit = $(this).attr('data-product-price');
    
            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();
    
            var totalPriceForProduct = pricePerUnit * quantity;
    
            // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });
    
          // حدث السعر الإجمالي لكل المُنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    };

    var citiesByCountry = {
        sa: ['الرياض','جدة'],
        eg: ['القاهرة','الإسكندرية'],
        jo: ['عمان','الزرقاء'],
        sy: ['دمشق','حلب','حماه']
    };
     // عندما يتغير البلد
    $('#form-checkout select[name="country"]').on( "change",function() {
        // اجلب رمز البلد
        var country = $(this).val();

        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرّغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        // أضف المدن إلى قائمة المدن
        cities.forEach(function(city) {
        var newOption = $('<option></option>');
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    $('#form-checkout input[name="payment_method"]').change(function(){

        var paymentMethod = $(this).val();

        if(paymentMethod === "on_delivery"){

            $('#credit-card-info input').prop('disabled', true);

        } else {

            $('#credit-card-info input').prop('disabled', false)

        }

        $('#credit-card-info').toggle();
    });

     //مكون البحث حسب السعر   
    $( "#price-range" ).slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [ 250, 800 ],
        slide: function( event, ui ) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });

})
