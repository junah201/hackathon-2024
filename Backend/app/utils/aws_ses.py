import boto3
from botocore.exceptions import ClientError

from app.common.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME
from app.database import models

from typing import List

SENDER = "no-rely@snuh-lab.kr"
AWS_REGION = "ap-northeast-2"

관리자 = "merrymay@snu.ac.kr"
최고관리자 = "turtree@daum.net"


def vacation_apply_mail(
    vacation: models.VacationHistory
):
    recipient = [관리자, 최고관리자]
    subject = f"{vacation.user.name}님이 휴가를 신청했습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1><strong>{vacation.user.name}</strong>님이 휴가를 신청했습니다.</h1>
        <p><strong>{vacation.user.name}</strong>님이 <strong>{vacation.vacation_start_at} ~ {vacation.vacation_end_at}</strong> <strong>{vacation.vacation_type}</strong> 휴가를 신청했습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def vacation_approve_mail(
    vacation: models.VacationHistory
):
    recipient = [vacation.user.email]
    subject = f"{vacation.user.name}님의 휴가가 승인되었습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1>{vacation.user.name}님의 휴가가 승인되었습니다.</h1>
        <p><strong>{vacation.user.name}</strong>님이 <strong>{vacation.vacation_start_at} ~ {vacation.vacation_end_at}</strong> <strong>{vacation.vacation_type}<strong/>휴가가 승인되었습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def overtime_apply_mail(
    overtime: models.Overtime
):
    recipient = [관리자, 최고관리자]
    subject = f"{overtime.user.name}님이 초과근무를 신청했습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1><strong>{overtime.user.name}</strong>님이 초과근무를 신청했습니다.</h1>
        <p><strong>{overtime.user.name}</strong>님이 <strong>{overtime.overtime_start_at} ~ {overtime.overtime_end_at}</strong> 초과근무를 신청했습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def overtime_approve_mail(
    overtime: models.Overtime
):
    recipient = [overtime.user.email]
    subject = f"{overtime.user.name}님의 초과근무가 승인되었습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1>{overtime.user.name}님의 초과근무가 승인되었습니다.</h1>
        <p><strong>{overtime.user.name}</strong>님의 <strong>{overtime.overtime_start_at} ~ {overtime.overtime_end_at}</strong> 초과근무가 승인되었습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def contract_apply_mail(
    contract: models.Contract
):
    recipient = [관리자]
    subject = f"{contract.user.name}님이 계약을 신청했습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1><strong>{contract.user.name}</strong>님이 계약을 신청했습니다.</h1>
        <p><strong>{contract.hospital__multiagency_challenge.hospital.hospital_name}</strong>과 <strong>{contract.hospital__multiagency_challenge.multiagency_challenge.challenge.display_name}</strong>과의 계약을 신청하였습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def contract_complete_mail(
    contract: models.Contract
):
    recipient = [contract.user.email]
    subject = f"{contract.user.name}님의 계약이 완료처리되었습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1>{contract.user.name}님의 계약이 완료처리되었습니다.</h1>
        <p><strong>{contract.hospital__multiagency_challenge.hospital.hospital_name}</strong>과 <strong>{contract.hospital__multiagency_challenge.multiagency_challenge.challenge.display_name}</strong>과의 계약이 완료되었습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def hospital_payment_apply_mail(
    payment: models.HospitalPayment
):
    recipient = [관리자, 최고관리자]
    subject = f"{payment.user.name}님이 {payment.hospital__multiagency_challenge.hospital.hospital_name}의 지급을 신청했습니다."
    html = f"""\
        <html>
        <head></head>
        <body>
        <h1>{payment.user.name}님이 <strong>{payment.hospital__multiagency_challenge.hospital.hospital_name}</strong>의 지급을 신청했습니다.</h1>
        <p><strong>{payment.hospital__multiagency_challenge.hospital.hospital_name}</strong>의 <strong>{payment.hospital__multiagency_challenge.multiagency_challenge.challenge.display_name}</strong>과의 지급을 신청하였습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def hospital_payment_review_mail(
    payment: models.HospitalPayment
):
    recipient = [관리자]
    subject = f"{payment.hospital__multiagency_challenge.hospital.hospital_name}의 연구비 지급이 승인되었습니다."

    html = f"""\
        <html>
        <head></head>
        <body>
        <h1>{payment.hospital__multiagency_challenge.hospital.hospital_name}의 연구비 지급이 승인되었습니다.</h1>
        <p><strong>{payment.hospital__multiagency_challenge.hospital.hospital_name}</strong>의 <strong>{payment.hospital__multiagency_challenge.multiagency_challenge.challenge.display_name}</strong>과의 연구비 지급이 승인되었습니다.</p>
        </body>
        </html>
        """

    send_mail(recipient, subject, html)


def send_mail(
        recipient: List[str],
        subject: str,
        html: str,
):
    client = boto3.client(
        'ses',
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': recipient
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': "UTF-8",
                        'Data': html,
                    },
                },
                'Subject': {
                    'Charset': "UTF-8",
                    'Data': subject,
                },
            },
            Source=SENDER,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
