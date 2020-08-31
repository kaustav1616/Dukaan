package com.luv2code.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

@RestController
public class EmailController
{
    @GetMapping(value = "/sendemail")
    public String sendEmail() throws AddressException, MessagingException, IOException
    {
        sendmail();
        return "Email sent successfully";
    }

    private void sendmail() throws AddressException, MessagingException, IOException
    {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("kaustavdoomhammer@gmail.com", "Abcd2017#");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("kaustavdoomhammer@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("kaustav1616@yahoo.com"));
        msg.setSubject("Tutorials point email");
        msg.setContent("Tutorials point email", "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent("Tutorials point email", "text/html");

        /*
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        MimeBodyPart attachPart = new MimeBodyPart();

        attachPart.attachFile("/var/tmp/image19.png");
        multipart.addBodyPart(attachPart);
        msg.setContent(multipart);

         */
        Transport.send(msg);
    }
}

























