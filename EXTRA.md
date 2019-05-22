@@ -25,6 +25,8 @@ _.FEED_CONTROL_SEQUENCES = {
   CTL_CR: '\x0d',   // Carriage return
   CTL_HT: '\x09',   // Horizontal tab
   CTL_VT: '\x0b',   // Vertical tab
+  R: '\x52',   // Vertical tab
+  USA: '\x00',   // Vertical tab
 };
this.buffer.write(_.ESC + _.FEED_CONTROL_SEQUENCES.R + _.FEED_CONTROL_SEQUENCES.USA);
