تغييرات: تم إضافة مصادقة (تسجيل/دخول) مع Firebase Auth، رفع وسائط (صور) إلى Firebase Storage، وتحديث المحادثة عند إرسال رسالة.

لتشغيل محلياً بعد التغيير:
1) npm install
2) تأكد من تعبئة .env بالقيم من Firebase
3) expo start

ملاحظات مهمة:
- لتفعيل اختيار الصور ذي صلة تحتاج إلى حزمة expo-image-picker (موجود عادة في Expo):
  expo install expo-image-picker
- للحصول على إشعارات دفع باستخدام Expo استخدم expo-notifications وإعدادات إضافية (APNs/FCM).
