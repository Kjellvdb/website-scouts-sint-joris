<?php
declare(strict_types=1);

// ==========================
// CONFIG
// ==========================
$TO_EMAIL = 'info@scoutssintjoris.be';
$FROM_EMAIL = 'no-reply@scoutssintjoris.be';
$SITE_NAME = 'Scouts Sint-Joris Aalst';

// ==========================
// HELPER FUNCTIONS
// ==========================
function clean(string $value): string {
    return trim(strip_tags($value));
}

function redirectWithStatus(string $status, string $message): never {
    header('Location: contact.html?status=' . urlencode($status) . '&msg=' . urlencode($message));
    exit;
}

// ==========================
// ONLY POST ALLOWED
// ==========================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectWithStatus('error', 'Ongeldige aanvraag.');
}

// ==========================
// HONEYPOT (OPTIONEEL)
// ==========================
if (!empty($_POST['company'])) {
    // Bot detected
    redirectWithStatus('success', 'Bericht verzonden.');
}

// ==========================
// VALIDATION
// ==========================
$naam      = clean($_POST['naam'] ?? '');
$email     = clean($_POST['mailadres'] ?? '');
$onderwerp   = clean($_POST['onderwerp'] ?? '');
$bericht   = clean($_POST['bericht'] ?? '');

if ($naam === '' || $email === '' || $onderwerp === '' || $bericht === '') {
    redirectWithStatus('error', 'Gelieve alle verplichte velden in te vullen.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectWithStatus('error', 'Ongeldig e-mailadres.');
}

// ==========================
// BUILD EMAIL
// ==========================
$mailSubject = "[Contact] {$onderwerp}";

$mailBody = <<<MAIL
Nieuw bericht via de website van {$SITE_NAME}

Naam:
{$naam}

E-mailadres:
{$email}

Onderwerp:
{$onderwerp}

Bericht:
{$bericht}
MAIL;

$headers = [
    "From: {$SITE_NAME} <{$FROM_EMAIL}>",
    "Reply-To: {$naam} <{$email}>",
    "Content-Type: text/plain; charset=UTF-8",
    "X-Mailer: PHP/" . phpversion()
];

// ==========================
// SEND MAIL
// ==========================
$sent = mail(
    $TO_EMAIL,
    $mailSubject,
    $mailBody,
    implode("\r\n", $headers)
);

if (!$sent) {
    redirectWithStatus('error', 'Er liep iets mis bij het verzenden. Probeer later opnieuw.');
}

// ==========================
// SUCCESS
// ==========================
redirectWithStatus('success', 'Bedankt! Je bericht werd succesvol verzonden.');
