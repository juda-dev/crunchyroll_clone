package dev.juda.service.impl;

import dev.juda.exception.EmailNotVerifiedException;
import dev.juda.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final String frontendUrl = "http://localhost:4200";

    public EmailServiceImpl(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendVerificationEmail(String toEmail, String token) {
        Context context = new Context();
        context.setVariable("verificationLink", frontendUrl + "/verify-email?token=" + token);

        String htmlContent = templateEngine.process("verification_email", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("JuDa Dev - Verify Your Email");
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

            logger.info("Verification email sent to {}", toEmail);
        } catch (Exception ex) {
            logger.error(
                    "Failed to send verification email to {}: {}",
                    toEmail,
                    ex.getMessage(),
                    ex
            );
            throw new EmailNotVerifiedException();
        }
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String token) {
        Context context = new Context();
        context.setVariable(
                "resetPasswordLink", frontendUrl + "/reset-password?token=" + token
        );

        String htmlContent = templateEngine.process("password_reset", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("JuDa Dev - Reset Your Password");
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

            logger.info("Reset password email sent to {}", toEmail);
        } catch (Exception ex) {
            logger.error(
                    "Failed to send reset password email to {}: {}",
                    toEmail,
                    ex.getMessage(),
                    ex
            );
            throw new RuntimeException("Failed to send password reset email");
        }
    }
}
